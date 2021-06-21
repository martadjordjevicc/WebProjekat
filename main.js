import {Lezaljka} from "./lezaljka.js"
import {Porudzbina} from "./porudzbina.js"
import {LetnjiBar} from "./letnjibar.js"

//const kafic1 = new LetnjiBar(1, "LocoLoco", "Kalitea", 33, 5, 2);
//kafic1.crtajBar(document.body);

fetch("https://localhost:5001/LetnjiBar/PreuzmiBarove").then(p => {
    p.json().then(data => {
        data.forEach(bar => {
            const bar1 = new LetnjiBar(bar.idBara, bar.naziv, bar.adresa, bar.kapacitet);
            bar1.crtajBar(document.body);
            console.log(bar.idBara);

            
        });
    });
});