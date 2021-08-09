import { Firma } from "./firma.js";
import { Radnik } from "./radnik.js";
import { Sektor } from "./sektor.js";


const firma1 = new Firma(1, "CD projekt red", "Gaming", "Neka tamo", 50000);

var sekt1 = new Sektor("Perica2", 1233, "Ovo je pericin2 sektor");
sekt1.dodajRadnike(new Radnik("Test", "Radnik", "Sef", 123));
firma1.dodajSektor(new Sektor("Perica", 123, "Ovo je pericin sektor"));
firma1.dodajSektor(sekt1);
firma1.crtajFirmu(document.body);