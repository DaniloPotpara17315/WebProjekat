import { Firma } from "./firma.js";
import { Sektor } from "./sektor.js";


const firma1 = new Firma(1, "CD projekt red", "Gaming", "Neka tamo", 50000);

firma1.dodajSektor(new Sektor("Perica", 123, "Ovo je pericin sektor"));
firma1.dodajSektor(new Sektor("Perica2", 1233, "Ovo je pericin2 sektor"));
firma1.crtajFirmu(document.body);