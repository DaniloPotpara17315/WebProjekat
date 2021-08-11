import { Radnik } from "./radnik.js";
export class Sektor {
    constructor(ime, budget, opis) {
        this.ime = ime;
        this.budget = budget;
        this.opis = opis;
        this.container = null;
        this.form = null;
        this.izgled = null;
        this.radnici = [];
    }

    crtajSebe(host) {
        if (!host) {
            throw new Error("Nema hosta!");
        }
        //crtamo buttone
        var buttonSektor = host.querySelector(".sektori");
        this.container = host;
        var elem = document.createElement("button");
        elem.classList.add("setButton");
        elem.classList.add("whiteFont");
        elem.classList.add("prikazButton");
        elem.innerHTML = this.ime;
        elem.onclick = event => {
            buttonSektor.classList.add("nestani");
            this.container.querySelector(".naslovZaSektore").classList.add("nestani");
            this.formaSektora(buttonSektor);
            this.crtajRadnike();
        }
        this.izgled = elem;
        buttonSektor.appendChild(elem);

    }

    formaSektora(nestali) {
        //gradjenje forma za prikaz sadrzaja
        var formica = document.createElement("div");
        formica.classList.add("celaForma");
        this.form = formica;
        var extraRed = document.createElement("div");
        extraRed.classList.add("endForme");
        //back button
        var buttonBack = document.createElement("button");
        buttonBack.innerHTML = "<-";
        buttonBack.classList.add("backButton");
        buttonBack.classList.add("whiteFont");
        buttonBack.classList.add("prikazButton");
        buttonBack.onclick = ev => {
            nestali.classList.remove("nestani");
            this.container.removeChild(this.form);
            this.container.querySelector(".naslovZaSektore").classList.remove("nestani");
        }
        extraRed.appendChild(buttonBack);
        this.form.appendChild(extraRed);
        var informacije = document.createElement("div");
        informacije.classList.add("basicInfo");
        informacije.classList.add("infoSektora");

        this.form.appendChild(informacije);
        var prikazInfo = document.createElement("div");
        prikazInfo.classList.add("labela");
        prikazInfo.classList.add("whiteFont");
        var actualInfo = document.createElement("div");
        actualInfo.classList.add("info");
        actualInfo.classList.add("whiteFont");
        //prikaz obicnih labela
        var nizic = ["Naziv sektora: ", "Budget sektora: ", "Opis sektora: "];
        var elem;
        nizic.forEach(x => {
            elem = document.createElement("h3");
            elem.innerHTML = x;
            elem.classList.add("uredi");
            prikazInfo.appendChild(elem);
        });
        //prikaz atributa klase
        this.azurirajForm(actualInfo);

        informacije.appendChild(prikazInfo);
        informacije.appendChild(actualInfo);
        //kraj prikaza informacija, sad idu funkcije
        var funkcijeSektora = document.createElement("div");
        funkcijeSektora.classList.add("endForme");
        funkcijeSektora.classList.add("funkcijeSektora");
        this.form.appendChild(funkcijeSektora);
        elem = document.createElement("button");
        elem.innerHTML = "Azuriraj";
        elem.classList.add("azur");
        elem.onclick = ev => {
            //prikazivanje forme za azuriranje
            this.onemoguci();
            actualInfo.classList.add("nestani");
            funkcijeSektora.classList.add("nestani");
            extraRed.classList.add("nestani");
            var formUnos = document.createElement("div");
            formUnos.classList.add("info");
            var elementForme = document.createElement("input");
            elementForme.value = this.ime;
            elementForme.classList.add("nazivSektora");
            elementForme.classList.add("space");
            elementForme.classList.add("formUnos");
            elementForme.classList.add("whiteFont");

            formUnos.appendChild(elementForme);
            elementForme = document.createElement("input");
            elementForme.classList.add("budgetSektora");
            elementForme.value = this.budget;
            elementForme.type = "number";
            elementForme.classList.add("formUnos");
            elementForme.classList.add("whiteFont");
            formUnos.appendChild(elementForme);
            elementForme = document.createElement("label");
            elementForme.classList.add("whiteFont");
            elementForme.classList.add("hint");
            elementForme.innerHTML = "Budget: " + this.bigFirma.izracunajBudgetDostupan() + "/ Min: " + this.minBudget();
            formUnos.appendChild(elementForme);
            elementForme = document.createElement("textarea");
            elementForme.classList.add("opisSektora");
            elementForme.classList.add("space");
            elementForme.classList.add("formUnos");
            elementForme.classList.add("whiteFont");
            elementForme.innerHTML = this.opis;
            formUnos.appendChild(elementForme);
            //alert("simulacija dodato");
            informacije.appendChild(formUnos);
            var funkcijeAzur = document.createElement("div");
            funkcijeAzur.classList.add("endForme");
            this.form.appendChild(funkcijeAzur);
            elementForme = document.createElement("button");
            elementForme.innerHTML = "Potvrdi";
            elementForme.classList.add("confirm");
            //dugme za potvrdu
            elementForme.onclick = ev => {
                var imeSektora = formUnos.querySelector(".nazivSektora").value;
                var budgetSek = parseInt(formUnos.querySelector(".budgetSektora").value);
                var opisSek = formUnos.querySelector(".opisSektora").value;
                if (budgetSek > +this.budget + this.bigFirma.izracunajBudgetDostupan()) {
                    alert("Nije moguc budget!");
                } else if (imeSektora.trim().length == 0 || opisSek.trim().length == 0 || budgetSek <= 0 || Number.isNaN(budgetSek) || budgetSek < this.minBudget()) {
                    alert("greska");
                } else {

                    fetch("https://localhost:5001/Firma/IzmeniSektor", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: this.id,
                            ime: imeSektora,
                            budget: budgetSek,
                            opis: opisSek
                        })
                    }).then(resp => {
                        if (resp.ok) {
                            this.ime = imeSektora;
                            this.budget = budgetSek;
                            this.opis = opisSek;
                            informacije.removeChild(formUnos);
                            this.form.removeChild(funkcijeAzur);
                            this.azurirajForm(actualInfo);
                            this.izgled.innerHTML = this.ime;
                            this.bigFirma.update();
                            this.omoguci();
                            extraRed.classList.remove("nestani");
                            actualInfo.classList.remove("nestani");
                            funkcijeSektora.classList.remove("nestani");
                            alert("Uspesno azuriran sektor!");
                        } else if (resp.status == 400) {
                            alert("Error 400 kod azuriranja sektora");
                        }
                    })
                }
            }
            funkcijeAzur.appendChild(elementForme);
            elementForme = document.createElement("div");
            elementForme.classList.add("spacer");
            funkcijeAzur.appendChild(elementForme);
            //dugme za cancel
            elementForme = document.createElement("button");
            elementForme.innerHTML = "Otkazi";
            elementForme.classList.add("deny");
            elementForme.onclick = ev => {
                if (confirm("Da li zelite da otkazete akciju?")) {
                    this.omoguci();
                    informacije.removeChild(formUnos);
                    this.form.removeChild(funkcijeAzur);
                    extraRed.classList.remove("nestani");
                    actualInfo.classList.remove("nestani");
                    funkcijeSektora.classList.remove("nestani");
                }

            }
            funkcijeAzur.appendChild(elementForme);

        }
        funkcijeSektora.appendChild(elem);
        elem = document.createElement("div");
        elem.classList.add("spacer");
        funkcijeSektora.appendChild(elem);

        elem = document.createElement("button");
        elem.innerHTML = "Obrisi";
        elem.classList.add("deny");
        elem.onclick = ev => {
            if (confirm("Da li ste sigurni da zelite da obrisete sektor?")) {
                fetch("https://localhost:5001/Firma/ObrisiSektor/" + this.id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({

                    })
                }).then(resp => {
                    if (resp.ok) {
                        this.bigFirma.sektori = this.bigFirma.sektori.filter(x => {
                            return x !== this;
                        });
                        nestali.removeChild(this.izgled);
                        nestali.classList.remove("nestani");
                        this.bigFirma.update();
                        this.container.removeChild(this.form);
                        this.container.querySelector(".naslovZaSektore").classList.remove("nestani");
                        alert("Uspesno obrisano!");
                    } else if (resp.status == 400) {
                        alert("Error 400 kod brisanja sektora");
                    }
                })

            }
        }
        funkcijeSektora.appendChild(elem);

        this.container.appendChild(this.form);

    }
    postaviId(id) {
        this.id = id;
    }
    dodajRadnike(radnik) {
        radnik.bigSektor = this;
        this.radnici.push(radnik);
    }
    azurirajForm(kanvas) {
        while (kanvas.hasChildNodes()) {
            kanvas.removeChild(kanvas.lastChild);
        }
        var niz = [this.ime, this.izracunajBudgetDostupan() + "/" + this.budget, this.opis];
        var elem;
        niz.forEach((x, ind) => {
            elem = document.createElement("h3");
            elem.innerHTML = x;
            elem.classList.add("uredi");
            if (ind === 1) {
                elem.classList.add("budgetSektora");
            }
            kanvas.appendChild(elem);
        })
    }
    crtajRadnike() {
        var radniciForm = document.createElement("div");
        radniciForm.classList.add("deoZaRadnike");
        var naslov = document.createElement("h2");
        naslov.innerHTML = "Radnici:";
        naslov.classList.add("colorMeBlind");
        naslov.classList.add("whiteFont");
        naslov.classList.add("naslovZaRadnike");
        var radnikElem = document.createElement("div");
        radnikElem.classList.add("radnici");
        radniciForm.appendChild(radnikElem);
        var elem;
        this.radnici.forEach(x => {
            x.crtajSebe(radniciForm);
        })
        elem = document.createElement("button");
        elem.classList.add("radButton");
        elem.classList.add("whiteFont");
        elem.classList.add("specialFontv2");
        elem.innerHTML = "+";
        elem.onclick = ev => {
            if (this.izracunajBudgetDostupan() > 0) {
                this.nestaniDugmici();
                this.dodavanjeNovogForma(radniciForm);
            } else {
                alert("Nemate vise para u budgetu");
            }
        }
        radnikElem.appendChild(elem);
        radniciForm.appendChild(naslov);
        radniciForm.appendChild(radnikElem);
        this.form.appendChild(radniciForm);
    }
    izracunajBudgetDostupan() {
        var helper = this.budget;
        this.radnici.forEach(x => {
            helper = helper - x.plata;
        })

        return helper;
    }
    minBudget() {
        var helper = 0;
        this.radnici.forEach(x => {
            helper = helper + x.plata;
        })
        return helper;
    }
    dodavanjeNovogForma(kanvas) {
        kanvas.querySelector(".naslovZaRadnike").classList.add("nestani");
        kanvas.querySelector(".radnici").classList.add("nestani");
        //bigForma
        var formNovRadnik = document.createElement("div");
        formNovRadnik.classList.add("basicInfo");
        formNovRadnik.classList.add("topSpace");
        //labela forme
        var leviDeo = document.createElement("div");
        leviDeo.classList.add("labela");
        var element;
        var nizic = ["Unesite ime radnika: ", "Unesite prezime radnika: ", "Izaberite rank radnika: ", "Unesite platu radnika: "];
        nizic.forEach(x => {
            element = document.createElement("label");
            element.innerHTML = x;
            element.classList.add("whiteFont");
            element.classList.add("formFont");
            element.classList.add("space");
            leviDeo.appendChild(element);
        });
        //inputi forme
        var desniDeo = document.createElement("div");
        desniDeo.classList.add("info");
        element = document.createElement("input");
        element.classList.add("imeRadnika");
        element.classList.add("space");
        element.classList.add("formUnos");
        element.classList.add("whiteFont");
        desniDeo.appendChild(element);
        element = document.createElement("input");
        element.classList.add("prezimeRadnika");
        element.classList.add("space");
        element.classList.add("formUnos");
        element.classList.add("whiteFont");
        desniDeo.appendChild(element);
        element = document.createElement("div");
        element.classList.add("red");
        element.classList.add("space");
        element.classList.add("formUnos");
        element.classList.add("whiteFont");
        desniDeo.appendChild(element);
        nizic = ["Sef", "Menadzer", "Radnik"];
        nizic.forEach(x => {
            var radElem = document.createElement("input");
            radElem.type = "radio";
            radElem.name = "rank";
            radElem.value = x;
            element.appendChild(radElem);
            radElem = document.createElement("label");
            radElem.innerHTML = x;
            element.appendChild(radElem);
        });
        element = document.createElement("input");
        element.type = "number";
        element.classList.add("plataRadnika");
        element.placeholder = "Max plata je: " + this.izracunajBudgetDostupan();
        element.classList.add("space");
        element.classList.add("formUnos");
        element.classList.add("whiteFont");
        desniDeo.appendChild(element);
        formNovRadnik.appendChild(leviDeo);
        formNovRadnik.appendChild(desniDeo);
        kanvas.appendChild(formNovRadnik);
        //funkcionalnosti
        var funkcijeForme = document.createElement("div");
        funkcijeForme.classList.add("endForme");
        kanvas.appendChild(funkcijeForme);
        element = document.createElement("button");
        element.innerHTML = "Dodaj radnika";
        element.classList.add("confirm");
        element.onclick = ev => {
            var imeRad = formNovRadnik.querySelector(".imeRadnika").value;
            var prezimeRad = formNovRadnik.querySelector(".prezimeRadnika").value;
            var rankRad = formNovRadnik.querySelector("input[name='rank']:checked");
            var plataRad = parseInt(formNovRadnik.querySelector(".plataRadnika").value);
            if (plataRad > this.izracunajBudgetDostupan()) {
                alert("Nemoguca plata");
            } else if (imeRad.trim().length == 0 || prezimeRad.trim().length == 0 || plataRad <= 0 || Number.isNaN(plataRad) || rankRad == null) {
                alert("Greska prilikom unosa");
            } else {

                fetch("https://localhost:5001/Firma/UnesiRadnika/" + this.id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ime: imeRad,
                        prezime: prezimeRad,
                        rank: rankRad.value,
                        plata: plataRad
                    })
                }).then(resp => {
                    if (resp.ok) {
                        var rad = new Radnik(imeRad, prezimeRad, rankRad.value, plataRad);
                        resp.json().then(x => {
                            x.value;
                            rad.postaviId(x.value);
                        });
                        this.dodajRadnike(rad);
                        rad.crtajSebe(kanvas);
                        //crtaj.classList.remove("nestani");
                        kanvas.querySelector(".naslovZaRadnike").classList.remove("nestani");
                        kanvas.querySelector(".radnici").classList.remove("nestani");
                        this.update();
                        this.pojaviDugmici();
                        kanvas.removeChild(formNovRadnik);
                        kanvas.removeChild(funkcijeForme);
                        alert("Uspesno dodat radnik");
                    } else if (resp.status == 400) {
                        alert("Error 400 kod dodavanja radnika");
                    }
                })

            }
        }
        funkcijeForme.appendChild(element);
        element = document.createElement("div");
        element.classList.add("spacer");
        funkcijeForme.appendChild(element);

        element = document.createElement("button");
        element.innerHTML = "Otkazi";
        element.classList.add("deny");
        element.onclick = ev => {
            kanvas.querySelector(".naslovZaRadnike").classList.remove("nestani");
            kanvas.querySelector(".radnici").classList.remove("nestani");
            this.pojaviDugmici();
            kanvas.removeChild(formNovRadnik);
            kanvas.removeChild(funkcijeForme);
        }
        funkcijeForme.appendChild(element);

    }
    update() {
        (this.form.querySelector(".infoSektora")).querySelector(".budgetSektora").innerHTML = this.izracunajBudgetDostupan() + "/" + this.budget;
    }
    onemoguci() {
        this.radnici.map(x => {
            x.izgled.disabled = true;
        })
        this.form.querySelector(".deoZaRadnike").querySelector(".radnici").querySelector(".specialFontv2").disabled = true;
    }
    omoguci() {
        this.radnici.map(x => {
            x.izgled.disabled = false;
        })
        this.form.querySelector(".deoZaRadnike").querySelector(".radnici").querySelector(".specialFontv2").disabled = false;
    }
    nestaniDugmici() {
        this.form.querySelector(".funkcijeSektora").classList.add("nestani");
    }
    pojaviDugmici() {
        this.form.querySelector(".funkcijeSektora").classList.remove("nestani");
    }
}