window.onload = function(){

	var procitanaData;
	VjezbeAjax.dohvatiPodatke(function(err,data){
        if(err != null ){
            alert(err)
        }
        else{ 
            procitanaData = data;

            VjezbeAjax.iscrtajVjezbe(document.getElementById("odabirVjezbeId"), procitanaData);

            var btn = document.getElementById("odabirVjezbeId").querySelectorAll("BUTTON");
            for(let i = 0; i < btn.length; i++){
                btn[i].onclick = function(d){
                    var br = parseInt(btn[i].name);
                    VjezbeAjax.iscrtajZadatke(document.getElementById("zadaci" + br), JSON.parse(data).brojZadataka[br]);
                }
            }

        }
    });





}