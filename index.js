const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(express.static('public/html'));

app.get('/vjezbe', function(req,res){
	fs.readFile('vjezbe.csv', function(err, data){
		if(err) throw err;
		let greska = "";

		let sadrzaj = data.toString().replace(/\r\n/, "\n").split(",");
		let brVjezbi = parseInt(sadrzaj[0]);

		if(brVjezbi <= 0 || brVjezbi > 15) greska += "Pogrešan parametar brojVjezbi";

		let brZadataka = []
        for(let i = 1; i <= brVjezbi; i++ ){    		
			brZadataka.push(parseInt(sadrzaj[i]))
        }

		for(let i = 1; i <= brVjezbi; i++ ){    		
			if(brZadataka[i] < 0 || brZadataka[i] > 10){
				if(greska !== "") greska += ",z" + i.toString();
				else greska += "Pogrešan parametar z" + i.toString();
			}
        }

		if(greska === ""){
        	res.json({brojVjezbi: brVjezbi, brojZadataka:brZadataka})
		}else{
			res.status(400);
			res.json({status: "error",data: greska});
		}
	})
})



app.post('/vjezbe', function(req,res){
	let tijelo = req.body;
	let greska = "";
	let novaLinija = tijelo['brojVjezbi'].toString() + ","; //za upisivanje u csv dat, format 5,5,4,2,1,3

	if(tijelo['brojVjezbi'] <= 0 || tijelo['brojVjezbi'] > 15) 
		greska += "Pogrešan parametar brojVjezbi";

	else if(tijelo['brojZadataka'].length < tijelo['brojVjezbi'] || tijelo['brojZadataka'].length > tijelo['brojVjezbi'])
		if(greska !== "") greska += ",brojZadataka";
		else greska += "Pogrešan parametar brojZadataka";

	for(var i=0; i<tijelo['brojZadataka'].length; i++){
		if(i != tijelo['brojZadataka'].length-1)
			novaLinija += tijelo['brojZadataka'][i].toString() + ",";
		else novaLinija += tijelo['brojZadataka'][i].toString() + "\n";

		if(tijelo['brojZadataka'][i] < 0 || tijelo['brojZadataka'][i] > 10){
			if(greska !== "") greska += ",z" + i.toString();
			else greska += "Pogrešan parametar z" + i.toString();
		}
	}


	if(greska === ""){
		fs.writeFile('vjezbe.csv', novaLinija, function(err){
			if(err) throw err;
			res.json(tijelo) 
		})
	}
	else{
		res.status(400);
		res.json({status: "error",data: greska});
	}
})

app.listen(3000);