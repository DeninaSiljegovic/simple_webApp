var TestoviParser = (function(){ 	

	var dajTacnost = function (izvjestaj){
		try{
			var report = JSON.parse(izvjestaj);
			var ukupanBrojTestova = report.stats.tests;
			var brojPassed = report.stats.passes;
			var brojFailed = report.stats.failures;
			var listaFailed = report.failures
		}catch(exception){
			return {tacnost: "0%", greske:["Testovi se ne mogu izvršiti"]}
		}

		//provjera mogucih issues sa izvjestajem
		if(ukupanBrojTestova != brojFailed + brojPassed) return {tacnost: "0%", greske:["Testovi se ne mogu izvršiti 2222"]}
		else if(brojPassed != report.passes.length || brojFailed != listaFailed.length || ukupanBrojTestova != report.tests.length) return {tacnost: "0%", greske:["Testovi se ne mogu izvršiti"]}


		if(ukupanBrojTestova == brojPassed && brojFailed == 0) //sve proslo
			return {tacnost: "100%", greske: []}

		else if(brojFailed != 0){
			var listaGreski = [];
			for(let i = 0; i < listaFailed.length; i++)
				listaGreski.push(listaFailed[i].fullTitle)

			var t = (brojPassed/ukupanBrojTestova)*100
			var t1 = (Math.round(t*10)/10) + "%";

			return {tacnost: t1, greske: listaGreski}
		}
	}


	var porediRezultate = function(rez1, rez2){

		try{
			var rezultat1 = JSON.parse(rez1);
			var rezultat2 = JSON.parse(rez2);
		}catch(exception){
			return {promjena: "0%", greske:["Testovi se ne mogu izvršiti"]}
		}

		var prvi_sviTestovi = rezultat1.tests;
		var drugi_sviTestovi = rezultat2.tests;
		var isti = 0;

		//prvo provjeriti da li su isti svi testovi
		if(prvi_sviTestovi.length == drugi_sviTestovi.length){
			isti = 1;
			var pronadjen = 0;

			for(let i = 0; i < prvi_sviTestovi.length; i++){
				pronadjen = 0;

				for(let j = 0; j < drugi_sviTestovi.length; j++){
					if(prvi_sviTestovi[i].fullTitle ==  drugi_sviTestovi[j].fullTitle){
						pronadjen = 1;
						break;
					}
				}

				if(pronadjen == 0){ 
					isti = 0; 
					break; 
				}
			}
		}


		if(isti == 1){
			var tacnost2 = dajTacnost(rez2);
			var gr = tacnost2.greske.sort(function(a, b) {
    			return a.localeCompare(b);
			});

			return {promjena: tacnost2.tacnost, greske: gr}
		}

		else{
			//prvo proci kroz sve testove iz rez1 i uzeti one koji nisu u rez2 
			var prvi_uniqueTestovi = [];
			for(let i = 0; i < prvi_sviTestovi.length; i++){
				pronadjen = 0;
				for(let j = 0; j < drugi_sviTestovi.length; j++){
					if(prvi_sviTestovi[i].fullTitle == drugi_sviTestovi[j].fullTitle){
						pronadjen = 1;
						break;
					}
				}
				if(pronadjen == 0) 
					prvi_uniqueTestovi.push(prvi_sviTestovi[i])
			}

			//sad uzeti samo one koji su unique + failed
			var prvi_uniqueFailed = []
			var prvi_failed = rezultat1.failures;
			for(let i = 0; i < prvi_uniqueTestovi.length; i++){
				for(let j = 0; j < prvi_failed.length; j++){
					if(prvi_uniqueTestovi[i].fullTitle == prvi_failed[j].fullTitle){
						prvi_uniqueFailed.push(prvi_failed[j].fullTitle);
						break;
					}
				}
			}

			//sortirati 
			prvi_uniqueFailed.sort(function(a, b) {
    			return a.localeCompare(b);
			});

			var drugi_failed = [];

			for(let i = 0; i < rezultat2.failures.length; i++){
				drugi_failed.push(rezultat2.failures[i].fullTitle)
			}

			drugi_failed.sort(function(a, b) {
    			return a.localeCompare(b);
			});
			
			for(let i = 0; i < drugi_failed.length; i++)
				prvi_uniqueFailed.push(drugi_failed[i])

			var t = ((prvi_uniqueFailed.length + drugi_failed.length)/(prvi_uniqueFailed.length + drugi_sviTestovi.length) * 100);
			var x = (Math.round(t*10)/10) + "%";

			return {promjena: x, greske: prvi_uniqueFailed}
		}

	}


	return{
		dajTacnost : dajTacnost,
		porediRezultate: porediRezultate
	}

}());