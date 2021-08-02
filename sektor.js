export class Sektor {
    constructor(ime, budget, opis) {
        this.ime = ime;
        this.budget = budget;
        this.opis = opis;
        this.container = null;
        this.cache = null;
        this.radnici = [];
    }

    crtajSebe(host) {
        if (!host) {
            throw new Error("Nema hosta!");
        }
    }
    postaviId(id) {
        this.id = id;
    }
}