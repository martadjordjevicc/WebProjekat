import {Porudzbina} from "./porudzbina.js"
//import {Kafic} from "./kafic.js"

export class Lezaljka{

    constructor(brojLezaljke,tip, ime, prezime, porudzbina){
        this.brojLezaljke = brojLezaljke;
        this.tip = tip; //da li je lezaljka slobodna ili ne
        this.ime = ime;
        this.prezime = prezime;

    }

    vratiBoju(){

        if(this.tip == "SLOBODNA")
            return "rgb(0, 253, 235)";
        else
            return "rgb(255, 154, 195)";
    }

    crtajLezaljku(host){

        if(!host)
           throw new Exception("Roditeljski element ne postoji");
        
        this.miniKontejner = document.createElement("div");
       
        this.miniKontejner.className="lezaljka";
        this.miniKontejner.innerHTML=this.brojLezaljke + " SLOBODNA";
        this.miniKontejner.style.backgroundColor=this.vratiBoju();
        host.appendChild(this.miniKontejner);
    }

    

    zauzmiLezaljku(br) {   

        if(this.tip === "ZAUZETA")
           alert("Ova lezaljka je zauzeta.");

        else{  
                
                this.brojLezaljke = br;
                this.tip = "ZAUZETA";
                this.miniKontejner.innerHTML= this.brojLezaljke + " ZAUZETA ";
                this.miniKontejner.style.backgroundColor = this.vratiBoju();
            
             }
     }

    naruci(br, por){

             if(this.tip == "SLOBODNA")
                 alert("Sa ove ležaljke ne moze da se naruči jer je slobodna.");
                 
            else{
                let dugmence = document.createElement("button");
                dugmence.className = "dugmence"
                dugmence.innerHTML = "info o porudzbini";
                this.miniKontejner.appendChild(dugmence);                      

                dugmence.onclick=(ev)=>{

                            alert("Broj porudžbine je " + por.vratiId() + "\n Za piće je naručeno: " + por.vratiPice() + " \n Za hranu je naručeno: " + por.vratiHranu());  
                                   
                    
                }

            }

                
        }

     klik(br, i, p)
        {
            this.miniKontejner.addEventListener("click", () => {
                //console.log(this.ime);
                confirm(`Ležaljku broj ${br} je zauzeo/la ${i} ${p}`);
            });

        }

    
    oslobodiLezaljku(br){

        this.tip = "SLOBODNA";
        this.miniKontejner.innerHTML = br + " SLOBODNA";        
    }

    izmeniLezaljku(ime, prez)
    {
        this.ime = ime;
        this.prezime = prez;

        
    }
    
}