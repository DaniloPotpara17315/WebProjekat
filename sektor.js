export class Sektor {
    constructor(ime, budget, opis) {
        this.ime = ime;
        this.budget = budget;
        this.opis = opis;
        this.container = null;
        this.form=null;
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
        this.form.appendChild(funkcijeSektora);
        elem = document.createElement("button");
        elem.innerHTML = "Azuriraj";
        elem.classList.add("azur");
        elem.onclick = ev => {
            //prikazivanje forme za azuriranje
            actualInfo.classList.add("nestani");
            funkcijeSektora.classList.add("nestani");
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
            elementForme.innerHTML="Dostupan budget: "+this.bigFirma.izracunajBudgetDostupan();
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
                if (budgetSek > +this.budget+this.bigFirma.izracunajBudgetDostupan()) {
                    alert("Nije moguc budget!");
                }
                else {
                    this.ime = imeSektora;
                    this.budget = budgetSek;
                    this.opis = opisSek;
                    informacije.removeChild(formUnos);
                    this.form.removeChild(funkcijeAzur);
                    this.azurirajForm(actualInfo);
                    this.izgled.innerHTML=this.ime;
                    actualInfo.classList.remove("nestani");
                    funkcijeSektora.classList.remove("nestani");                 
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
                    informacije.removeChild(formUnos);
                    this.form.removeChild(funkcijeAzur);
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
                this.bigFirma.sektori = this.bigFirma.sektori.filter(x => {
                    return x.ime !== this.ime && x.budget !== this.budget;
                });
                nestali.removeChild(this.izgled);
                nestali.classList.remove("nestani");
                this.container.removeChild(this.form);
                this.container.querySelector(".naslovZaSektore").classList.remove("nestani");
            }
        }
        funkcijeSektora.appendChild(elem);

        this.container.appendChild(this.form);

    }
    postaviId(id) {
        this.id = id;
    }
    azurirajForm(kanvas) {
        while (kanvas.hasChildNodes()) {
            kanvas.removeChild(kanvas.lastChild);
        }
        var elem = document.createElement("h3");
        elem.innerHTML = this.ime;
        elem.classList.add("uredi");
        kanvas.appendChild(elem);
        elem = document.createElement("h3");
        elem.innerHTML = this.budget;
        elem.classList.add("uredi");
        kanvas.appendChild(elem);
        elem = document.createElement("h3");
        elem.innerHTML = this.opis;
        elem.classList.add("uredi");
        kanvas.appendChild(elem);
    }
    crtajRadnike()
    {

    }
}