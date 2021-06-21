import {Lezaljka} from "./lezaljka.js"
import {Porudzbina} from "./porudzbina.js"

export class LetnjiBar{

    constructor(id, naziv,adresa, kapacitet)
    {
        this.id = id;
        this.naziv = naziv;
        this.adresa = adresa;
        this.kapacitet = kapacitet;  //ukupan broj lezaljki       
        this.lezaljke = [];
        this.porudzbine = [];
        this.kontejner = null;
    }

    dodajLezaljku(lez){
        this.lezaljke.push(lez);
    }

    dodajPorudzbinu(por){
        this.porudzbine.push(por);
    }

    crtajBar(host){

        if(!host)
            throw new Exception("Roditeljski element ne postoji");
         
        
        this.crtajNaslov(host);
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("kontejner");
        host.appendChild(this.kontejner);
        
        this.crtajFormu(this.kontejner);
        this.crtajLezaljke(this.kontejner);

    }

    crtajNaslov(host)
    {
        //dobrodosli

        var nesto = document.createElement("div");
        nesto.className = "nesto"
        host.appendChild(nesto);
        var ulaz = document.createElement("h1");
        ulaz.className = "naslovveci";
        ulaz.innerHTML = "Dobrodošli u " + this.naziv;
        nesto.appendChild(ulaz);

        var manji = document.createElement("h3");
        manji.className = "naslovmanji"
        manji.innerHTML = this.adresa;
        nesto.appendChild(manji);

    }

    crtajFormu(host){
        
        //PRVA
        var kontForma =document.createElement("div");
        kontForma.className = "klasa"
        host.appendChild(kontForma);

        var kontForma1 = document.createElement("div");
        kontForma.appendChild(kontForma1);
        kontForma1.className = "kontForma";   
        //this.kontejner.appendChild(kontForma1);

        //naslov
        var naslov = document.createElement("h3");
        naslov.innerHTML = "Izaberite ležaljku";
        naslov.className = "naslov";  
        kontForma1.appendChild(naslov);

        //labela br lezaljke
        var labela = document.createElement("label");
        labela.innerHTML = "Broj ležaljke"
        labela.className = "labele";  
        kontForma1.appendChild(labela);

        let unos = document.createElement("input");
        unos.className= "broj";   
        kontForma1.appendChild(unos);

        //labela za ime
        labela = document.createElement("label");
        labela.innerHTML = "Ime"
        labela.className = "labele";  
        kontForma1.appendChild(labela);

        unos = document.createElement("input");
        unos.className = "ime";   
        kontForma1.appendChild(unos);

        //labela za prezime
        labela = document.createElement("label");
        labela.innerHTML = "Prezime"
        labela.className = "labele";  
        kontForma1.appendChild(labela);

        unos = document.createElement("input");
        unos.className = "prezime";   
        kontForma1.appendChild(unos);

        



     //DRUGA
        var kontForma2 = document.createElement("div");
        kontForma.appendChild(kontForma2);
        kontForma2.className = "kontForma";   
        //host.appendChild(kontForma2);

        //naslov
         naslov = document.createElement("h3");
        naslov.innerHTML = "Poručite";
        naslov.className = "naslov";    
        kontForma2.appendChild(naslov);

        //labela br lezaljke
         labela = document.createElement("label");
        labela.innerHTML = "Broj ležaljke"
        labela.className = "labele"; 
        kontForma2.appendChild(labela);

         unos = document.createElement("input");
        unos.className= "brojj";   
        kontForma2.appendChild(unos);

        
        let hrana = ["","Tost", "Pomfrit", "Pizza", "Palačinka", "Cezar salata", "Voćna salata"];
        let pice = ["", "Voda", "Sok","Limunada", "Kafa", "Pivo"];

        let selH= document.createElement("select");
        selH.className = "selekt";
        labela = document.createElement("label");
        labela.innerHTML="Hrana ";
        labela.className = "labele"
        kontForma2.appendChild(labela);
        kontForma2.appendChild(selH);

        for(let i=0; i<7;i++){
            let opcija=document.createElement("option");
            opcija.innerHTML=hrana[i];
            opcija.value=hrana[i];
            selH.appendChild(opcija);
        }

        let selP= document.createElement("select");
        selP.className = "selekt";
        labela = document.createElement("label");
        labela.innerHTML="Piće ";
        labela.className = "labele"
        kontForma2.appendChild(labela);
        kontForma2.appendChild(selP);

        for(let i=0; i<6;i++){
            let opcija=document.createElement("option");
            
            opcija.innerHTML=pice[i];
            opcija.value=pice[i];
            selP.appendChild(opcija);
        }

        /*labela = document.createElement("label");
        labela.innerHTML = "ID"
        labela.className = "labele";  
        kontForma2.appendChild(labela);

         unos = document.createElement("input");
        unos.className= "idP";  
        kontForma2.appendChild(unos);*/

        //dugme za rezervisanje
           
        dugme = document.createElement("button");
        dugme.innerHTML = "Zauzmi ležaljku";
        dugme.className = "dugme"
        kontForma1.appendChild(dugme);
        dugme.onclick=(ev)=>{

            const ime = document.querySelector(".ime").value;       
            console.log(ime);

            const prezime = document.querySelector(".prezime").value;
            console.log(prezime);

            const bro = document.querySelector(".broj").value;               
            console.log(bro);


           if(bro > this.kapacitet)
               alert("Lezaljka sa tim brojem ne postoji. Izaberite neku drugu.");

          else{

                    fetch("https://localhost:5001/LetnjiBar/ZauzmiLezaljku/" + this.id,{

                        method:"POST",
                        headers:{
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify({

                            brojLezaljke:bro,
                            tip:"ZAUZETA",
                            ime:ime,
                            prezime:prezime,
                        })
            
                        }).then(p=>{
                            if(p.ok)
                            {
                            
                            this.lezaljke[bro].zauzmiLezaljku(bro);
                            this.lezaljke[bro].klik(bro, ime, prezime);

                    
                            }
         
                    })
                 }

               
        
           //this.lezaljke[bro].zauzmiLezaljku(bro);
           //this.lezaljke[bro].klik(bro, ime, prezime);
            
        }

        
        //dugme za brisanje rezervacije
        dugme = document.createElement("button");
        dugme.innerHTML = "Oslobodi ležaljku";
        dugme.className = "dugme"
        kontForma1.appendChild(dugme);
        dugme.onclick=(ev)=>{

            const bro = document.querySelector(".broj").value;               
            console.log(bro);            
            
            fetch("https://localhost:5001/LetnjiBar/OslobodiLezaljku/" + bro + "/" + this.id,{

                        method: "DELETE"
                    }).then(resp=>{
                        if(resp.ok){
                            location.reload();
                        
                        }
                     }).catch (err=>{
                          console.log(err);
                     });         
            
        }

        dugme = document.createElement("button");
        dugme.innerHTML = "Promeni rezervaciju";
        dugme.className = "dugme"
        kontForma1.appendChild(dugme);
        dugme.onclick=(ev)=>{

            const ime = document.querySelector(".ime").value;       
            console.log(ime);

            const prezime = document.querySelector(".prezime").value;
            console.log(prezime);

            const bro = document.querySelector(".broj").value;               
            console.log(bro);

            fetch("https://localhost:5001/LetnjiBar/IzmeniLezaljku/"+bro + "/" + ime + "/" + prezime,{
                method: "PUT"
            }).then(resp=>{
                if(resp.ok){
                    location.reload();
                    //console.log(this.lezaljke[bro].izmeniLezaljku(ime, prezime));

                    this.lezaljke[bro].izmeniLezaljku(ime, prezime);
                }
             }).catch(err=>{
                  console.log(err);
             });
        }
    

      //dugme za porucivanje
        var dugme = document.createElement("button");
        dugme.innerHTML = "Naruči";
        dugme.className = "dugme"
        kontForma2.appendChild(dugme);
        dugme.onclick=(ev)=>{

            const br = document.querySelector(".brojj").value;               
            console.log(br);

            const hranaa = selH.value;       
            console.log(hranaa);

            const picee = selP.value;
            console.log(picee);

            let por = new Porudzbina(br, hranaa, picee)


           if(br > this.kapacitet)
               alert("Lezaljka sa tim brojem ne postoji. Izaberite neku drugu.");

            else{

                fetch("https://localhost:5001/LetnjiBar/DodajPorudzbinu"+this.id,{

                        method:"POST",
                        headers:{
                            "Content-Type" : "application/json"
                        },
                        body: JSON.stringify({
                            id:br,
                            hrana:hranaa,
                            pice:picee,
                            
                        })

                        }).then(p=>{
                            if(p.ok)
                            {
                            
                                this.lezaljke[br].naruci(br,por);
                        
                            }

                        }) 
               }
        
           //this.lezaljke[br].naruci(br, por);
           
            
        }

        /*var dugme = document.createElement("button");
        dugme.innerHTML = "Izmeni";
        dugme.className = "dugme"
        kontForma2.appendChild(dugme);
        dugme.onclick=(ev)=>{

            const br = document.querySelector(".idP").value;               
            console.log(br);

            const hranaa = selH.value;       
            console.log(hranaa);

            const picee = selP.value;
            console.log(picee);

            fetch("https://localhost:5001/LetnjiBar/IzmeniPorudzbinu/"+ br + "/" + hranaa + "/" + picee,{
                method: "PUT"
            }).then(resp=>{
                if(resp.ok){
                    location.reload();
                    //this.porudzbine[br].izmeniPorudzbinu(hranaa, picee);
                }
             }).catch(err=>{
                  console.log(err);
             });
        }

        var dugme = document.createElement("button");
        dugme.innerHTML = "Otkaži";
        dugme.className = "dugme"
        kontForma2.appendChild(dugme);
        dugme.onclick=(ev)=>{

            const br = document.querySelector(".idP").value;               
            console.log(br);

            fetch("https://localhost:5001/LetnjiBar/OtkaziPorudzbinu/"+ br ,{
                method: "DELETE"
            }).then(resp=>{
                if(resp.ok){
                    location.reload();
                }
             }).catch(err=>{
                  console.log(err);
             });
        }*/
    }
    
    crtajLezaljke(host){

        const kontLezaljke = document.createElement("div");
        kontLezaljke.className="kontLezaljke"  
        host.appendChild(kontLezaljke);

        //let red;
        let sto;
        let lok;
        for(let i=0; i<this.kapacitet; i++){

            lok = new Lezaljka(i, "SLOBODNA", "", "", "");
            let por = new Porudzbina(i, "", "");
            this.dodajLezaljku(lok);
            this.dodajPorudzbinu(por);
            lok.crtajLezaljku(kontLezaljke);
                   
        }

    }

}

