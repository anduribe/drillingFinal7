const express = require('express');
const { sequelize, User, Bootcamp } = require('./models');
const userController = require('./controllers/user.controller');
const bootcampController = require('./controllers/bootcamp.controller');

const app = express();

app.use(express.json());

app.post('/users', userController.createUser);
app.get('/users/:id/bootcamps', userController.getUserWithBootcamps);
app.get('/users-with-bootcamps', userController.getUsersWithBootcamps);
app.put('/users/:id', userController.updateUserById); // Ruta actualizar usuario por ID
app.delete('/users/:id', userController.deleteUserById); // Ruta para eliminar usuario por ID
app.get('/users/:id', userController.getUserById);

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente.');

    await sequelize.sync({ alter: true });
    console.log('Base de datos sincronizada.');

    await userController.createUsers();
    console.log('Usuarios creados.');

    console.log('Creando bootcamps...');
    await bootcampController.createBootcamps();
    console.log('Bootcamps creados.');

    console.log('Asociando usuarios con bootcamps...');
  
   
    const bootcampReact = await Bootcamp.findOne({ where: { title: 'Introduciendo El Bootcamp De React.' } });
    const bootcampFullStack = await Bootcamp.findOne({ where: { title: 'Bootcamp Desarrollo Web Full Stack.' } });
    const bootcampBigData = await Bootcamp.findOne({ where: { title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning.' } });

    const usersReact = await User.findAll({ where: { firstName: ['Mateo', 'Santiago'] } });
    const usersFullStack = await User.findOne({ where: { firstName: 'Mateo' } });
    const usersBigData = await User.findAll({ where: { firstName: ['Mateo', 'Santiago', 'Lucas'] } });

    await bootcampReact.addUsers(usersReact);
    await bootcampFullStack.addUsers(usersFullStack);
    await bootcampBigData.addUsers(usersBigData);

    console.log("***************************");
    console.log("Usuarios agregados a los bootcamps correspondientes");
    console.log("***************************");

    app.listen(3000, () => {
      console.log('Servidor escuchando en el puerto 3000.');
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}

main();
