const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const Vjezba = sequelize.define("vjezba",{
        naziv:Sequelize.STRING        
    })
    return Vjezba;
};