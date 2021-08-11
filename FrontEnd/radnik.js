export class Radnik {
    constructor(ime, prezime, rank, plata) {
        this.ime = ime;
        this.prezime = prezime;
        this.rank = rank;
        this.plata = plata;
        this.izgled = null;
        this.container = null;
    }
    crtajSebe(host) {
        if (!host) {
            throw new Error("Nema hosta");
        }
        this.container = host;
        var radniciSekt = this.container.querySelector(".radnici");
        var elem = document.createElement("button");
        elem.classList.add("radButton");
        elem.classList.add("whiteFont");
        elem.classList.add("prikazButton");
        elem.innerHTML = this.ime + '<br>' + this.prezime;
        this.izgled = elem;
        elem.onclick = ev => {
            radniciSekt.classList.add("nestani");
            this.container.querySelector(".naslovZaRadnike").classList.add("nestani");
            this.bigSektor.nestaniDugmici();
            this.prikazInfo(radniciSekt);
        }
        radniciSekt.appendChild(this.izgled);
    }
    prikazInfo(nestani) {
        var formaRadnika = document.createElement("div");
        formaRadnika.classList.add("celaForma");

        var returnRed = document.createElement("div");
        returnRed.classList.add("endForme");
        //Back button
        var buttonBack = document.createElement("button");
        buttonBack.innerHTML = "<-";
        buttonBack.classList.add("backButton");
        buttonBack.classList.add("whiteFont");
        buttonBack.classList.add("prikazButton");
        buttonBack.classList.add("backRadnik");
        buttonBack.onclick = ev => {
            this.container.removeChild(formaRadnika);
            nestani.classList.remove("nestani");
            this.bigSektor.pojaviDugmici();
            this.container.querySelector(".naslovZaRadnike").classList.remove("nestani");
        }
        returnRed.appendChild(buttonBack);
        formaRadnika.appendChild(returnRed);
        //basic info radnika
        var info = document.createElement("div");
        info.classList.add("basicInfo");
        info.classList.add("infoRadnika");
        var textIspis = document.createElement("div");
        textIspis.classList.add("labela");
        textIspis.classList.add("whiteFont");
        var niz = ["Ime: ", "Prezime: ", "Rank: ", "Plata: "];
        var elem;
        niz.forEach(x => {
            elem = document.createElement("h3");
            elem.innerHTML = x;
            elem.classList.add("uredi");
            textIspis.appendChild(elem);
        });
        var infoIspis = document.createElement("div");
        infoIspis.classList.add("info");
        infoIspis.classList.add("whiteFont");
        niz = [this.ime, this.prezime, this.rank, this.plata];
        niz.forEach(x => {
            elem = document.createElement("h3");
            elem.innerHTML = x;
            elem.classList.add("uredi");
            infoIspis.appendChild(elem);
        });
        info.appendChild(textIspis);
        info.appendChild(infoIspis);
        formaRadnika.appendChild(info);
        this.dodajFunkcionalnosti(formaRadnika, infoIspis, info);
        this.container.appendChild(formaRadnika);
    }
    dodajFunkcionalnosti(kanvas, zamena, modulator) {
        //dodavanje buttona
        var zadnjiDeo = document.createElement("div");
        zadnjiDeo.classList.add("endForme");
        var dugmici = document.createElement("button");
        dugmici.innerHTML = "Azuriraj";
        dugmici.classList.add("azur");
        dugmici.onclick = ev => {
            kanvas.querySelector(".backRadnik").classList.add("nestani");
            zamena.classList.add("nestani");
            zadnjiDeo.classList.add("nestani");
            var unosInfo = document.createElement("div");
            unosInfo.classList.add("info");
            unosInfo.classList.add("whiteFont");
            var elem = document.createElement("input");
            elem.classList.add("imeRadnika");
            elem.classList.add("space");
            elem.classList.add("formUnos");
            elem.classList.add("whiteFont");
            elem.value = this.ime;
            unosInfo.appendChild(elem);
            elem = document.createElement("input");
            elem.classList.add("prezimeRadnika");
            elem.classList.add("space");
            elem.classList.add("formUnos");
            elem.classList.add("whiteFont");
            elem.value = this.prezime;
            unosInfo.appendChild(elem);
            elem = document.createElement("div");
            elem.classList.add("redV2");
            elem.classList.add("space");
            elem.classList.add("formUnos");
            elem.classList.add("whiteFont");
            unosInfo.appendChild(elem);
            var nizic = ["Sef", "Menadzer", "Radnik"];
            nizic.forEach(x => {
                var radElem = document.createElement("input");
                radElem.type = "radio";
                radElem.name = "rank";
                radElem.value = x;
                if (x == this.rank) {
                    radElem.checked = true;
                }
                elem.appendChild(radElem);
                radElem = document.createElement("label");
                radElem.innerHTML = x;
                elem.appendChild(radElem);
            });
            elem = document.createElement("input");
            elem.type = "number";
            elem.classList.add("plataRadnika");
            elem.value = this.plata;
            elem.classList.add("formUnos");
            elem.classList.add("whiteFont");
            unosInfo.appendChild(elem);
            elem = document.createElement("label");
            elem.classList.add("whiteFont");
            elem.classList.add("hint");
            elem.innerHTML = "Moguci dodatak: " + this.bigSektor.izracunajBudgetDostupan();
            unosInfo.appendChild(elem);
            modulator.appendChild(unosInfo);
            var funkRadnika = document.createElement("div");
            funkRadnika.classList.add("endForme");
            dugmici = document.createElement("button");
            dugmici.innerHTML = "Potvrdi";
            dugmici.classList.add("confirm");
            dugmici.onclick = ev => {
                var imeRad = unosInfo.querySelector(".imeRadnika").value;
                var prezimeRad = unosInfo.querySelector(".prezimeRadnika").value;
                var rankRad = unosInfo.querySelector("input[name='rank']:checked");
                var plataRad = parseInt(unosInfo.querySelector(".plataRadnika").value);
                if (plataRad > this.bigSektor.izracunajBudgetDostupan() + this.plata) {
                    alert("Nemoguca plata");
                } else if (imeRad.trim().length == 0 || prezimeRad.trim().length == 0 || plataRad <= 0 || Number.isNaN(plataRad) || rankRad == null) {
                    alert("Greska prilikom unosa");
                } else {
                    fetch("https://localhost:5001/Firma/IzmeniRadnika", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: this.id,
                            ime: imeRad,
                            prezime: prezimeRad,
                            rank: rankRad.value,
                            plata: plataRad
                        })
                    }).then(resp => {
                        if (resp.ok) {
                            this.ime = imeRad;
                            this.prezime = prezimeRad;
                            this.rank = rankRad.value;
                            this.plata = plataRad;
                            this.izgled.innerHTML = this.ime + '<br>' + this.prezime;
                            this.bigSektor.update();
                            this.azurFormu(zamena);
                            modulator.removeChild(unosInfo);
                            kanvas.removeChild(funkRadnika);
                            kanvas.querySelector(".backRadnik").classList.remove("nestani");
                            zamena.classList.remove("nestani");
                            zadnjiDeo.classList.remove("nestani");
                            alert("Uspesno azuriran radnik!");
                        } else if (resp.status == 400) {
                            alert("Error 400 kod azuriranja radnika");
                        }
                    })
                }
            }
            funkRadnika.appendChild(dugmici);
            dugmici = document.createElement("div");
            dugmici.classList.add("spacer");
            funkRadnika.appendChild(dugmici);
            dugmici = document.createElement("button");
            dugmici.innerHTML = "Otkazi";
            dugmici.classList.add("deny");
            dugmici.onclick = ev => {
                modulator.removeChild(unosInfo);
                kanvas.removeChild(funkRadnika);
                kanvas.querySelector(".backRadnik").classList.remove("nestani");
                zamena.classList.remove("nestani");
                zadnjiDeo.classList.remove("nestani");
            }
            funkRadnika.appendChild(dugmici);
            kanvas.appendChild(funkRadnika);
        }

        zadnjiDeo.appendChild(dugmici);

        dugmici = document.createElement("div");
        dugmici.classList.add("spacer");
        zadnjiDeo.appendChild(dugmici);

        dugmici = document.createElement("button");
        dugmici.innerHTML = "Obrisi";
        dugmici.classList.add("deny");
        dugmici.onclick = ev => {
            if (confirm("Da li ste sigurni da zelite da obrisete radnika?")) {
                fetch("https://localhost:5001/Firma/ObrisiRadnika/" + this.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                    })
                }).then(resp => {
                    if (resp.ok) {
                        this.bigSektor.radnici = this.bigSektor.radnici.filter(x => {
                            return x !== this;
                        });
                        (this.container.querySelector(".radnici")).removeChild(this.izgled);
                        //nestali.removeChild(this.izgled);
                        (this.container.querySelector(".radnici")).classList.remove("nestani");

                        this.bigSektor.update();
                        this.bigSektor.pojaviDugmici();
                        this.container.removeChild(kanvas);
                        kanvas.querySelector(".backRadnik").classList.remove("nestani");
                        this.container.querySelector(".naslovZaRadnike").classList.remove("nestani");
                        alert("Uspesno obrisan radnik!");
                    } else if (resp.status == 400) {
                        alert("Error 400 kod brisanja radnika");
                    }
                })

            }
        };
        zadnjiDeo.appendChild(dugmici);
        kanvas.appendChild(zadnjiDeo);
    }
    azurFormu(komponenta) {
        while (komponenta.hasChildNodes()) {
            komponenta.removeChild(komponenta.lastChild);
        }
        var niz = [this.ime, this.prezime, this.rank, this.plata];
        var elem;
        niz.forEach(x => {
            elem = document.createElement("h3");
            elem.innerHTML = x;
            elem.classList.add("uredi");
            komponenta.appendChild(elem);
        });
    }
    postaviId(id) {
        this.id = id;
    }
}