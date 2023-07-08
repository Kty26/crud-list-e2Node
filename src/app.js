const express = require('express');
const cors = require('cors');
require('dotenv').config();


const db = require('./utils/database');
const Crud_e2 = require('./models/usersmodels');
Crud_e2;
const PORT= process.env.PORT ?? 8000;

db.authenticate() 
.then(() => console.log('Autenticación exitosa base de datos todo List'))

.catch(error => console.log( error));

db.sync()//devuelve una promesa// SI NO EXISTE la tabla, LA CREA
.then(() => console.log('BASE DE DATOS SINCRONIZADA'))

const app = express();
app.use(express.json());
app.use(cors());

//----------CRUD --------
//  create 
//Users.create({
    //   email: 'kathy@example.com',
    //   password: '1234'
    //});.

    app.post('/todos', async(req, res) => {//manejo de excepciones
      try{
       //obtener la información del body
       const newTask = req.body;// *{ title, description }
       //mandar a crear la info obtenida
       const todo_list= await Crud_e2.create(newTask);//User es un objeto 
       //responder que se ha realizado la acción
       res.status(201).send(todo_list);
      }catch (error) {
      res.status(400).json(error);
      }
    });
 // si alguien crea un POST en esa ruta, yo debo de crear a un usuario

           //SELECT id, name, lastname, email, FROM users 
//select.findAll()
app.get('/todos', async (req, res) => {
  try{
     //TODO mandar a buscar todos los usuarios
     const find_task = await Crud_e2.findAll({
     
      attributes: [
        'id',
        'title',
        'description',
        'is_Completed',
      ]
    });  
      //TODO responder a cliente
     res.json(find_task);
    }

    catch (error) {
      res.status(400).json(error);
    }
});

//Encontrar una tarea por su id
//path params -> parámetros de ruta
app.get('/todos/:id', async (req, res) => {
const {id} = req.params;
  try{


//TODO realizar la consulta a la bd 
const result = await Crud_e2.findByPk(id, {
  attributes: [
      "id",
      "title",
      "description",
      "is_Completed",
  ]
})
res.json(result);
  }
  catch (error) {
  res.status(400).json(error);
  }
})

// UPDATE list
app.put('/todos/:id', async (req, res) => {

  try{
    //modificate 
  //TODO  obtener IP 
  //TODO obtener el body con la informacion 
  const {id} = req.params;
  const {title, description, isCompleted} = req.body;
   
  //TODO realizar la consulta para actualizar
  //* Responde un numero las cantidad de filas afectadas
  const list = await Crud_e2.update({title, description, isCompleted},{
    where: {id}//---> shorthand where: {id: id}
    });
    res.status(201).send(list);
  } catch (error) {
  res.status(400).json(error);
  }
});

//----------------------Delete------------------------------------

//! ********************** DELETE
app.delete("/todos/:id", async (req, res) => {
  try {
    // todo obtener el id de la ruta
    const { id } = req.params;
    // todo eliminar en la base de datos
    await Crud_e2.destroy({
      where: { id }, // -> {id: id}
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get('/', (req, res) => {
    res.status(200).json({message: 'Bienvenido al servidor'});
});

 //----------CRUD --------





app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto: ${PORT}`);
})

 