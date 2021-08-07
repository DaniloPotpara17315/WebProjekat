export class Radnik{
    constructor(ime,prezime,rank,plata){
        this.ime=ime;
        this.prezime=prezime;
        this.rank=rank;
        this.plata=plata;
    }
    crtajSebe(host){
        if(!host){
            throw new Error("Nema hosta");
        }
    }
}