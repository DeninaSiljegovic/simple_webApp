//Povezivanje modula sa formom

var object = document.getElementById("zadaci");
var brVjezbi = document.getElementById("brojVjezbi");
var button = document.getElementById("send");

brVjezbi.onblur = function(){    
    VjezbeAjax.dodajInputPolja(document.getElementById("zadaci"),brVjezbi.value)
}

button.onclick = () => {

    brojVjezbi = brVjezbi.value;

    var vjezbeObjekat = new Object()
    vjezbeObjekat.brojVjezbi = parseInt(brVjezbi.value);
    vjezbeObjekat.brojZadataka = []

    var div = document.getElementById("zadaciDiv")
    var zadaciInput = div.querySelectorAll("input")

    for(let i = 0; i < zadaciInput.length; i++){
        vjezbeObjekat.brojZadataka.push(parseInt(zadaciInput[i].value))
    }
    console.log(JSON.stringify(vjezbeObjekat))

    VjezbeAjax.posaljiPodatke(JSON.stringify(vjezbeObjekat),function(err,data){
        if(err != null ){
            alert(err)
        }
        else{
            alert("Uspješno ste poslali formu!")
        }
    });     
}



