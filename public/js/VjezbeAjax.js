let VjezbeAjax = (function(){

    var dodajInputPolja = function(DOMelementDIVauFormi,brojVjezbi){
        DOMelementDIVauFormi.innerHTML = "";

        var div = document.createElement("zadaciDiv")
        div.id = "zadaciDiv"
        DOMelementDIVauFormi.appendChild(div)

        if(brojVjezbi > 0 && brojVjezbi <= 15){        
            for(var i = 0; i < brojVjezbi; i++){
                var label = document.createElement("label");
                label.textContent = "z" + i.toString() + ":  ";
                div.appendChild(label);         

                var x = document.createElement("input");
                x.type = "number";
                x.value = 4;
                x.name = "z" + i.toString();
                x.id = "z" + i.toString();
                div.appendChild(x);

                var br = document.createElement("br");
                div.appendChild(br);
            }
        }
        
    }

    var posaljiPodatke = function(vjezbeObjekat, callbackFja){
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/vjezbe", true); 
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                callbackFja(null, ajax.response);
            }
            else if(ajax.readyState == 4){
                callbackFja(JSON.parse(ajax.response).data, null);
            }
        }
        //xhttp.send({brojVjezbi: vjezbeObjekat.brojVjezbi,  brojZadataka: vjezbeObjekat.brojZadataka});
        //console.log("posaljiPodatke: " + vjezbeObjekat);
        ajax.send(vjezbeObjekat);
    }



    //zadatak2:
    var dohvatiPodatke = function(callbackFja){
        var ajax = new XMLHttpRequest();
        ajax.open("GET", "http://localhost:3000/vjezbe", true);
        ajax.setRequestHeader('Content-type', 'application/json');
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                callbackFja(null, ajax.response);
            }           
            else if(ajax.readyState == 4){
                callbackFja(ajax.response.data, null)
            }
        };
        ajax.send();
    }


    var iscrtajVjezbe = function(divDOMelement,vjezbeObjekat){
        objekat = JSON.parse(vjezbeObjekat);
        var brVjezbi = objekat.brojVjezbi;

        var x = document.createElement("TABLE");
        x.setAttribute("id", "myTable");
        divDOMelement.appendChild(x);

        if(brVjezbi > 0 && brVjezbi <= 16){
            for(let i = 0; i < brVjezbi; i++){
                var div = document.createElement("zadaci" + i.toString());
                div.id = "zadaci" + i.toString();
                div.style.display = "none"

                var y = document.createElement("TR");
                y.setAttribute("id", "vjezba" + i.toString());
                x.appendChild(y);

                var z = document.createElement("TD");
                var b = document.createElement("BUTTON");
                b.style.width = "100%";
                b.style.height = "100%";
                b.style.backgroundColor = "#7f9183";
                b.name = i.toString();
               
                var b1 = document.createTextNode("VJEŽBA " + (i+1).toString());
                b.appendChild(b1);
                z.appendChild(b);
                y.appendChild(z);

                x.appendChild(div)
            }
        }else{
            console.log("Neispravan broj vjezbi");
        }
    }


    var iscrtajZadatke = function(vjezbaDOMelement,brojZadataka){
        if(vjezbaDOMelement.style.display == "none")
            vjezbaDOMelement.style.display = "block"
        else 
            vjezbaDOMelement.style.display = "none";
       
        if(vjezbaDOMelement.children.length == 0 && brojZadataka > 0){
            for(let i = 1; i <= brojZadataka; i++){
                var b = document.createElement("BUTTON");

                b.style.backgroundColor = "#b8b8aa";
                b.style.padding = "5px";
                b.style.display = "inline-block";

                b.name = "z" + i.toString();

                var b1 = document.createTextNode("ZADATAK " + i.toString());
                b.appendChild(b1);
                vjezbaDOMelement.appendChild(b);

            }
        }
        else if(brojZadataka < 0) console.log("Neispravan broj zadataka")  
    }


    return {
        dodajInputPolja: dodajInputPolja,
        posaljiPodatke: posaljiPodatke,
        dohvatiPodatke: dohvatiPodatke,
        iscrtajVjezbe: iscrtajVjezbe,
        iscrtajZadatke: iscrtajZadatke
    }
}())