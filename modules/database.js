const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2118625","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.vjezba = require(__dirname +'/vjezba.js')(sequelize);
db.zadatak = require(__dirname +'/zadatak.js')(sequelize);
db.student = require(__dirname +'/student.js')(sequelize);
db.grupa = require(__dirname +'/grupa.js')(sequelize);

//relacije
// Veza 1-n 
db.vjezba.hasMany(db.zadatak,{as:'zadaciVjezbe'});

module.exports=db;