const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors')

const Sequelize = require('sequelize');
const db = require('./modules/database.js');
db.sequelize.sync({force:true});

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname));
app.use(express.static('public'));
app.use(express.static('public/html'));

app.get('/vjezbe', function(req,res){
	db.vjezba.findAll().then(function(vjezbe){
		var lista = [];
		var brojZadataka = [];
		vjezbe.forEach(v =>
			lista.push(db.zadatak.findAll({where:{vjezbaId: v.id}}).then(function(zad){
				brojZadataka.push(zad.length);
			}))
		)
		Promise.all(lista).then(function(){
			console.log("get:" + brojZadataka);

			let greska = "";
			if(vjezbe.length <= 0 || vjezbe.length > 15) greska += "Pogrešan parametar brojVjezbi";
			for(let i = 0; i < brojZadataka.length; i++ ){    		
				if(brojZadataka[i] < 0 || brojZadataka[i] > 10){
					if(greska !== "") greska += ",z" + i.toString();
					else greska += "Pogrešan parametar z" + i.toString();
				}
			}

			if(greska === ""){
				res.json({brojVjezbi: vjezbe.length, brojZadataka:brojZadataka})
			}else{
				res.status(400);
				res.json({status: "error",data: greska});
			}
		})
	});
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
	
		db.vjezba.destroy({truncate: {cascade: true}, restartIdentity: true}).then(function(){

			db.zadatak.destroy({truncate: {cascade: true}, restartIdentity: true}).then(function(){

				let lista = [];
				for(let i = 0; i < tijelo['brojVjezbi']; i++){
					db.vjezba.create({naziv: "vjezba"+ i.toString()}).then(function(){
						for(let j = 0; j < tijelo['brojZadataka'][i]; j++){
							lista.push(db.zadatak.create({naziv: "zadatak" + j.toString(), vjezbaId: i+1}));
						}
					})
				}

				Promise.all(lista).then(function(){
					res.json(tijelo)
				})

			})
		})

	}
		
	else{
		res.status(400);
		res.json({status: "error",data: greska});
	}
})

//spirala4 dopune:

app.post('/student', function(req,res){
	let tijelo = req.body
	//prvo provjerimo da li postoji vec student
	db.student.findOne({where: {index: tijelo.index}}).then(function(s){
		if(s !== null) res.json({status: "Student sa indeksom " + tijelo.index + " već postoji!"});
		else{
			db.grupa.findOrCreate ({where:{naziv: tijelo.grupa}}).then(function(gr){
				db.student.create({ime: tijelo.ime, prezime: tijelo.prezime, index: tijelo.index, grupa: tijelo.grupa}).then(function(){
					res.json({status: "Kreiran student!"});
				})
			})
		}
	})
})


app.put('/student/:index', function(req,res){
	let tijelo = req.body
	var poslanIndex = req.params.index
	db.student.findOne({where: {index: poslanIndex.toString()}}).then(function(s){
		if(s === null){
			res.json({status:"Student sa indexom " + poslanIndex + " ne postoji"})
			console.log("Student sa indexom " + poslanIndex + " ne postoji")
		}  
		else{
			db.grupa.findOrCreate({where:{naziv: tijelo.grupa}}).then(function(gr){
				
				db.student.update(
					{ grupa: tijelo.grupa},
					{ where: { index: poslanIndex } }
				).then(function(){
					res.json({status:"Promjenjena grupa studentu " + poslanIndex})
				})

			})
		}
	})
})


// POST /batch/student CSV(ime,prezime,index,grupa)
app.post('/batch/student',  function(req,res){
	let tijelo = req.body
	let brojDodanihStudenata = 0;
	let vecpostojeIndexi = [];
	let listaPromise = []
	for(let i = 0;	i < tijelo.length; i++){
		listaPromise.push(new Promise(function(resolve,reject){
			db.student.findOne({where: {index: tijelo[i].index}}).then(function(student){
        	if(student == null){
        		db.student.create({ime: tijelo[i].ime, prezime: tijelo[i].prezime, index: tijelo[i].index, grupa: null}).then(function(s){
        		
        			db.grupa.findOne({where: {naziv: tijelo[i].grupa}}).then(function(grupa){
        				if(grupa == null){
							db.grupa.create({naziv: tijelo[i].grupa}).then(function(){                                          
                                db.student.update({grupa: tijelo[i].grupa}, {where: {index: tijelo[i].index}}).then(function()
                                	{ 
                                		brojDodanihStudenata++;
                                		resolve() 
                                	})
        						
        					})    				
						}else{
							db.student.update({grupa: tijelo[i].grupa}, {where: {index: tijelo[i].index}}).then(function(){
							 brojDodanihStudenata++;
							 resolve()
							  })
						}
        			})
        		})//zatvara student create
        	}
        	else{

        		vecpostojeIndexi.push(tijelo[i].index);
        		resolve()
        	}
        })
		}))
        

	}//kraj for petlje

	Promise.all(listaPromise).then(function(){
		console.log("Niz indexa postojecih " + vecpostojeIndexi)

		if(vecpostojeIndexi.length == 0){
			res.json({status:"Dodano " + brojDodanihStudenata + " studenata!"});
		}else{
			let poruka = "Dodano " + brojDodanihStudenata + " studenata, a studenti {";
			for(let i = 0; i < vecpostojeIndexi.length; i++){
				poruka += vecpostojeIndexi[i].toString();
				if(i != vecpostojeIndexi.length-1) poruka += ",";
			}
			poruka += "} već postoje!"

			res.json({status: poruka});
			res.end();
		}
	})
	


})

app.listen(3000);