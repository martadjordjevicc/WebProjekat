import {LetnjiBar} from "./letnjibar.js"
import {Lezaljka} from "./lezaljka.js"

export class Porudzbina{

    constructor(id, hrana,  pice){

        this.id = id;
        this.hrana = hrana;
        this.pice = pice;
        this.kontejnerpor = null;
    }

    vratiId(){
        return this.id;
    }

    vratiHranu(){
        return this.hrana;
    }

    vratiPice(){
        return this.pice;
    }

    izmeniPorudzbinu(hrana, pice)
    {
        this.hrana = hrana;
        this.pice = pice;
    }

    otkaziPorudzbinu()
    {
        this.id = 0;
        this.hrana = "";
        this.pice = "";
    }


    


        

   
}