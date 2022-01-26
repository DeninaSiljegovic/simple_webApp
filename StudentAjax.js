let  StudentAjax = (function(){


    var dodajStudenta = function (student, fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "http://localhost:3000/student", true); 
        ajax.setRequestHeader("Content-Type", "application/json");

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.response).status);
            }
            else if(ajax.readyState == 4){
                fnCallback(JSON.parse(ajax.response).status, null);
            }
        }
        //SALJE GOOD STUDENTA  
        //console.log("posaljiStudenta: " + JSON.stringify(student));
        ajax.send(JSON.stringify(student));
    }



    var postaviGrupu = function (index, grupa, fnCallback){
        // console.log("Index je: " + index);
        // console.log("Gurpa je " + JSON.stringify({grupa: grupa}));

        var ajax = new XMLHttpRequest();
        ajax.open("PUT", "http://localhost:3000/student/" + index, true); 
        ajax.setRequestHeader("Content-Type", "application/json");

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(null, JSON.parse(ajax.response).status);
            }
            else if(ajax.readyState == 4){
                fnCallback(JSON.parse(ajax.response).status, null);
            }
        }

        ajax.send(JSON.stringify({grupa: grupa}));
    }



    var dodajBatch = function (csvStudenti, fnCallback){
        var ajax = new XMLHttpRequest()
        ajax.open("POST", "http://localhost:3000/batch/student", true)
        ajax.setRequestHeader("Content-Type", "application/json")

        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200 && ajax.response != ''){
                fnCallback(null,JSON.parse(ajax.response).status)
            }
            else if(ajax.readyState == 4){
                fnCallback(JSON.parse(ajax.response).status, null)
            }
        }

        var posalji = []
        var niz = csvStudenti.split('\n')
        for(let i = 0; i < niz.length; i++){
            var lin = niz[i].split(',');
            posalji.push({ime: lin[0], prezime: lin[1], index: lin[2], grupa: lin[3]})
        }

        console.log("ovo se salje: " + JSON.stringify(posalji));
        ajax.send(JSON.stringify(posalji))
    }


    return{
        dodajStudenta: dodajStudenta,
        postaviGrupu: postaviGrupu,
        dodajBatch: dodajBatch
    }

}())