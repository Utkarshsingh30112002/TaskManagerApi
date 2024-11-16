const Sequelze = require('sequelize');
const database=require('../config/database')

const sequelze=new Sequelze(database.name,database.user,database.password,{
    dialect:"mysql"
});

module.exports=sequelze;