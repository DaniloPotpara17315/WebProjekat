import { Sektor } from "./sektor.js";

export class Firma {

    constructor(id, naziv, tip, adresa, funds) {
        this.id = id;
        this.naziv = naziv;
        this.tip = tip;
        this.adresa = adresa;
        this.maxBudget = funds;
        this.container = null;
        this.sektori = [];
    }

    crtajFirmu(host) {
        if (!host) {
            throw new Error("Nema hosta!");
        }
        host.classList.add("start");
        var elem = document.createElement("div");

        elem.classList.add("izgled");
        this.container = elem;
        elem = document.createElement("h2");
        elem.innerHTML = "Informacije firme";
        elem.classList.add("colorMeBlind");
        elem.classList.add("whiteFont");
        this.container.appendChild(elem);
        //div basic info-a
        this.crtajBasicInfo();
        //prelazimo na sektore
        elem = document.createElement("h2");
        elem.innerHTML = "Sektori:";
        elem.classList.add("colorMeBlind");
        elem.classList.add("whiteFont");
        elem.classList.add("naslovZaSektore");

        this.container.appendChild(elem);
        this.crtajSektore();

        host.appendChild(this.container);
    }

    crtajBasicInfo() {
        var elem = document.createElement("div");
        elem.classList.add("basicInfo");

        //levi deo prikaza basic informacija
        var leviElem = document.createElement("div");
        leviElem.classList.add("labela");
        leviElem.classList.add("whiteFont");
        var nizic = ["Ime: ", "Tip: ", "Adresa: ", "Para: "];
        var elementic;
        nizic.forEach(x => {
            elementic = document.createElement("h3");
            elementic.innerHTML = x;
            elementic.classList.add("uredi");
            leviElem.appendChild(elementic);
        })

        //desni deo prikaza basic informacija
        var desniElem = document.createElement("div");
        desniElem.classList.add("info");
        desniElem.classList.add("whiteFont");
        nizic = [this.naziv, this.tip, this.adresa, this.izracunajBudgetDostupan() + "/" + this.maxBudget];
        nizic.forEach((x, ind) => {
            elementic = document.createElement("h3");
            elementic.innerHTML = x;
            if (ind === 3) {
                elementic.classList.add("budgetic");
            }
            elementic.classList.add("uredi");
            desniElem.appendChild(elementic);
        })

        //dodavanje levog dela
        elem.appendChild(leviElem);
        //dodavanje desnog dela
        elem.appendChild(desniElem);
        //dodavanje basic info
        this.container.appendChild(elem);

    }
    dodajSektor(sektor) {
        sektor.bigFirma = this;
        this.sektori.push(sektor);
    }
    crtajSektore() {
        var sektelem = document.createElement("div");
        sektelem.classList.add("sektori");
        this.container.appendChild(sektelem);
        var elem;
        //dodavanje gotovih sektora
        this.sektori.forEach(x => {

                x.crtajSebe(this.container);
            })
            //dodavanje novih sektora
        elem = document.createElement("button");
        elem.classList.add("setButton");
        elem.classList.add("whiteFont");
        elem.classList.add("specialFont");
        elem.innerHTML = "+";
        elem.onclick = ev => {
            if (this.izracunajBudgetDostupan() > 0) {
                this.dodavanjeNovogForma(sektelem);

            } else {
                alert("Nemate vise para u budgetu");
            }
        }
        sektelem.appendChild(elem);


        this.container.appendChild(sektelem);
    }
    dodavanjeNovogForma(crtaj) {
        this.container.querySelector(".naslovZaSektore").classList.add("nestani");
        crtaj.classList.add("nestani");
        var wholeForm = document.createElement("div");
        wholeForm.classList.add("celaForma");
        var formZaUnos = document.createElement("div");
        formZaUnos.classList.add("basicInfo");
        //levi deo forme za unos
        var redic = document.createElement("div");
        redic.classList.add("labela");
        var elemen;
        var nizic = ["Unesite naziv sektora: ", "Unesite zahtevani budget: ", "Unesite kratak opis sektora: "];
        nizic.forEach(x => {
            elemen = document.createElement("label");
            elemen.innerHTML = x;
            elemen.classList.add("whiteFont");
            elemen.classList.add("formFont");
            elemen.classList.add("space");
            redic.appendChild(elemen);
        })
        formZaUnos.appendChild(redic);
        //kraj levog dela forme za unos
        //pocekat desnog dela forme za unos
        redic = document.createElement("div");
        redic.classList.add("info");

        elemen = document.createElement("input");
        elemen.classList.add("nazivSektora");
        elemen.classList.add("space");
        elemen.classList.add("formUnos");
        elemen.classList.add("whiteFont");
        redic.appendChild(elemen);
        elemen = document.createElement("input");
        elemen.classList.add("budgetSektora");
        elemen.classList.add("space");
        elemen.type = "number";
        elemen.classList.add("formUnos");
        elemen.classList.add("whiteFont");
        elemen.placeholder = "Max budget je " + this.izracunajBudgetDostupan();
        redic.appendChild(elemen);

        elemen = document.createElement("textarea");
        elemen.classList.add("opisSektora");
        elemen.classList.add("space");
        elemen.classList.add("formUnos");
        elemen.classList.add("whiteFont");
        elemen.rows = "4";
        redic.appendChild(elemen);
        formZaUnos.appendChild(redic);
        //kraj desnog dela forme
        wholeForm.appendChild(formZaUnos);
        redic = document.createElement("div");
        redic.classList.add("endForme");
        elemen = document.createElement("button");
        elemen.innerHTML = "Dodaj sektor";
        elemen.classList.add("confirm");
        elemen.onclick = ev => {
            //alert("simulacija dodato");
            var imeSek = formZaUnos.querySelector(".nazivSektora").value;
            var budgetSek = parseInt(formZaUnos.querySelector(".budgetSektora").value);
            var opisSek = formZaUnos.querySelector(".opisSektora").value;
            if (budgetSek > this.izracunajBudgetDostupan()) {
                alert("Premasili ste dostupan budget");
            } else if (imeSek.trim().length == 0 || opisSek.trim().length == 0 || budgetSek <= 0 || Number.isNaN(budgetSek)) {
                alert("Greska prilikom unosa");
            } else {
                fetch("https://localhost:5001/Firma/UnesiSektor/"+this.id,{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        ime:imeSek,
                        budget:budgetSek,
                        opis:opisSek
                    })
                }).then(resp =>{
                    if(resp.ok)
                    {
                        var sek = new Sektor(imeSek, budgetSek, opisSek);
                        resp.json().then(x=>{
                            x.value;
                            console.log(x.value);
                            sek.postaviId(x.value);
                        });
                        
                        this.dodajSektor(sek);
                        sek.crtajSebe(this.container);

                        crtaj.classList.remove("nestani");
                        this.container.querySelector(".naslovZaSektore").classList.remove("nestani");
                        this.update();
                        this.container.removeChild(wholeForm);
                    }
                    else if(resp.status = 400){
                        alert("400 error");
                    }
                })
                
            }
        }
        redic.appendChild(elemen);
        elemen = document.createElement("div");
        elemen.classList.add("spacer");
        redic.appendChild(elemen);

        elemen = document.createElement("button");
        elemen.innerHTML = "Otkazi";
        elemen.classList.add("deny");
        elemen.onclick = ev => {
            crtaj.classList.remove("nestani");
            this.container.querySelector(".naslovZaSektore").classList.remove("nestani");
            this.container.removeChild(wholeForm);
        }
        redic.appendChild(elemen);

        wholeForm.appendChild(redic);
        this.container.appendChild(wholeForm);
    }
    izracunajBudgetDostupan() {
        var helper = this.maxBudget;
        this.sektori.forEach(x => {
            helper = helper - x.budget;
        })

        return helper;
    }
    update() {
        (this.container.querySelector(".basicInfo")).querySelector(".budgetic").innerHTML = this.izracunajBudgetDostupan() + "/" + this.maxBudget;
    }
}