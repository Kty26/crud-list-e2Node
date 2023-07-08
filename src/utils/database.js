const {Sequelize} = require('sequelize')
require("dotenv").config();

const db = new Sequelize ({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    
    
dialect:'postgres',
//dialectOptions:{ssl:{require:true, rejectUnauthorized: false}},
});



/*const db2 = new Sequelize ({
    database : 'express',
    username : 'kattia_contreras',
    password : 'root',
    host : 'localhost',
    port : 5432 ,
    dialect : 'postgres',
})*/

module.exports = db