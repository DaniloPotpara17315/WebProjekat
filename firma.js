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
        elem = document.createElement("h3");
        elem.innerHTML="Informacije firme";
        elem.classList.add("colorMeBlind");
        this.container.appendChild(elem);
        //div basic info-a
        this.crtajBasicInfo();
        //prelazimo na sektore
        elem = document.createElement("h3");
        elem.innerHTML="Sektori firme";
        elem.classList.add("colorMeBlind");
        this.container.appendChild(elem);


        host.appendChild(this.container);
    }

    crtajBasicInfo()
    {
        var elem = document.createElement("div");
        elem.classList.add("basicInfo");

        //levi deo prikaza basic informacija
        var leviElem = document.createElement("div");
        leviElem.classList.add("labela");

        var nizic = ["Ime: ", "Tip: ", "Adresa: ", "Para: "];
        var elementic;
        nizic.forEach(x => {
            elementic = document.createElement("h4");
            elementic.innerHTML = x;
            elementic.classList.add("uredi");
            leviElem.appendChild(elementic);
        })

        //desni deo prikaza basic informacija
        var desniElem = document.createElement("div");
        desniElem.classList.add("info");

        elementic = document.createElement("h4");
        elementic.innerHTML = this.naziv;
        elementic.classList.add("uredi");
        desniElem.appendChild(elementic);

        elementic = document.createElement("h4");
        elementic.innerHTML = this.tip;
        elementic.classList.add("uredi");
        desniElem.appendChild(elementic);

        elementic = document.createElement("h4");
        elementic.innerHTML = this.adresa;
        elementic.classList.add("uredi");
        desniElem.appendChild(elementic);

        elementic = document.createElement("h4");
        elementic.innerHTML = this.maxBudget;
        elementic.classList.add("uredi");
        desniElem.appendChild(elementic);
        
        //dodavanje levog dela
        elem.appendChild(leviElem);
        //dodavanje desnog dela
        elem.appendChild(desniElem);

        //dodavanje basic info
        this.container.appendChild(elem);
    }
    dodajSektor(sektor){
        this.sektori.push(sektor);
    }
    crtajSektore(){

    }
}