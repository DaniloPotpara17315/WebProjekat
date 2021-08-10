import { Firma } from "./firma.js";
import { Radnik } from "./radnik.js";
import { Sektor } from "./sektor.js";

fetch("https://localhost:5001/Firma/VratiFirme").then(res =>{
    res.json().then(podaci =>{
        podaci.forEach(firma=>{
            var Firm = new Firma(firma.id,firma.naziv,firma.tip,firma.adresa,firma.maxbudget);
            firma.sektori.forEach(sekt=>{
                var Sekt = new Sektor(sekt.ime,sekt.budget,sekt.opis);
                Sekt.postaviId(sekt.id);
                sekt.radnici.forEach(radn=>{
                    var Rand = new Radnik(radn.ime,radn.prezime,radn.rank,radn.plata);
                    Rand.postaviId(radn.id);
                    Sekt.dodajRadnike(Rand);
                })
                Firm.dodajSektor(Sekt);
            });
            Firm.crtajFirmu(document.body);
        });
    });
});

// const firma1 = new Firma(1, "CD projekt red", "Gaming", "Neka tamo", 50000);

// var sekt1 = new Sektor("Perica2", 1233, "Ovo je pericin2 sektor");
// sekt1.dodajRadnike(new Radnik("Test", "Radnik", "Sef", 123));
// firma1.dodajSektor(new Sektor("Perica", 123, "Ovo je pericin sektor"));
// firma1.dodajSektor(sekt1);
// firma1.crtajFirmu(document.body);

// const firma2 = new Firma(1, "CD projekt red", "Gaming", "Neka tamo", 50000);

// var sekt2 = new Sektor("Perica2", 1233, "Ovo je pericin2 sektor");
// sekt2.dodajRadnike(new Radnik("Test", "Radnik", "Sef", 123));
// firma2.dodajSektor(new Sektor("Perica", 123, "Ovo je pericin sektor"));
// firma2.dodajSektor(sekt2);
// firma2.crtajFirmu(document.body);