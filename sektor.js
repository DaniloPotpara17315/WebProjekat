export class Sektor {
    constructor(ime, budget, opis) {
        this.ime = ime;
        this.budget = budget;
        this.opis = opis;
        this.container = null;
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
            this.formaSektora(buttonSektor);
        }
        this.izgled = elem;
        buttonSektor.appendChild(elem);
    }

    formaSektora(nestali) {
        //gradjenje forma za prikaz sadrzaja
        var formica = document.createElement("div");
        formica.classList.add("celaForma");
        var informacije = document.createElement("div");
        informacije.classList.add("basicInfo");
        formica.appendChild(informacije);
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
        elem = document.createElement("h3");
        elem.innerHTML = this.ime;
        elem.classList.add("uredi");
        actualInfo.appendChild(elem);
        elem = document.createElement("h3");
        elem.innerHTML = this.budget;
        elem.classList.add("uredi");
        actualInfo.appendChild(elem);
        elem = document.createElement("h3");
        elem.innerHTML = this.opis;
        elem.classList.add("uredi");
        actualInfo.appendChild(elem);

        informacije.appendChild(prikazInfo);
        informacije.appendChild(actualInfo);
        //kraj prikaza informacija, sad idu funkcije
        var funkcijeSektora = document.createElement("div");
        funkcijeSektora.classList.add("endForme");
        formica.appendChild(funkcijeSektora);
        elem = document.createElement("button");
        elem.innerHTML = "Azuriraj";
        elem.classList.add("azur");
        elem.onclick = ev => {
            //alert("simulacija dodato");



            //nestali.classList.remove("nestani");


            //this.container.removeChild(formica);

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
                this.bigFirma.sektori = this.bigFirma.sektori.filter(x => {
                    return x.ime !== this.ime && x.budget !== this.budget;
                });
                nestali.removeChild(this.izgled);
                nestali.classList.remove("nestani");
                this.container.removeChild(formica);
            }
        }
        funkcijeSektora.appendChild(elem);

        this.container.appendChild(formica);

    }
    postaviId(id) {
        this.id = id;
    }
}