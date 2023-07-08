
const { DataTypes } = require('sequelize');
const db = require('../utils/database');

const Crud_e2 = db.define('crud_e2', {
    //por defecto crea el id

    id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
     },

     title:{
        type: DataTypes.STRING(50),
        allowNull: false,
         }, 

    description:{
        type : DataTypes.TEXT,
        allowNull: false,
    },

    isCompleted:{
        type : DataTypes.BOOLEAN, 
        defaultValue: false,
        field: 'is_Completed',
        
    },
       
});

module.exports = Crud_e2;