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
        var niz = ["Ime: ", "Prezime: ", "Rank: ", "Plata: "];
        var elem;
        niz.forEach(x => {
            elem = document.createElement("label");
            elem.innerHTML = x;
            elem.classList.add("whiteFont");
            elem.classList.add("formFont");
            elem.classList.add("space");
            textIspis.appendChild(elem);
        });
        var infoIspis = document.createElement("div");
        infoIspis.classList.add("info");
        niz
        info.appendChild(textIspis);
        formaRadnika.appendChild(info);
        this.container.appendChild(formaRadnika);
    }
}