const { User, Bootcamp } = require('../models');

const users = [
  { 
    firstName: 'Mateo',
    lastName: 'Díaz',
    email: 'mateo.diaz@correo.com'
  },
  {  
    firstName: 'Santiago',
    lastName: 'Mejías',
    email: 'santiago.mejias@correo.com'
  },
  {
    firstName: 'Lucas', 
    lastName: 'Rojas',
    email: 'lucas.rojas@correo.com'
  },
  {
    firstName: 'Facundo',
    lastName: 'Fernandez', 
    email: 'facundo.fernandez@correo.com'
  }
];

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 2)}`);
  return res.json(user);
};

const createUsers = async () => {
  for (let user of users) {
    // Comprobamos si el email ya existe
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      // Actualizamos el usuario
      console.log(`Email ${user.email} ya existe, actualizando...`);
      await User.update(user, { where: { email: user.email } });
    } else {
      // Insertamos el usuario
      const createdUser = await User.create(user);
      console.log(`>> Creado el usuario: ${JSON.stringify(createdUser, null, 2)}`);
    }
  }
};

const getUserWithBootcamps = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id, {
      include: Bootcamp
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Se ha producido un error al recuperar el usuario' });
  }
};

const getUsersWithBootcamps = async (req, res) => {
  try {
    const usersWithBootcamps = await User.findAll({
      include: Bootcamp
    });
    res.json(usersWithBootcamps);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Se ha producido un error al buscar usuarios con bootcamps' });
  }
};

const updateUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const [updatedRows, updatedUsers] = await User.update(req.body, {
      where: { id },
      returning: true,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: 'No encontrasdo' });
    }

    const updatedUser = updatedUsers[0];
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error al actualizar usuario' });
  }
};

const deleteUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedRows = await User.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).json({ message: 'usuario no existe' });
    }

    res.json({ message: 'Usuario borrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error al borrar usuario' });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id, {
      include: Bootcamp
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encotrado' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Se ha producido un error al buscar el usuario' });
  }
};

module.exports = {
  createUser,
  createUsers,
  getUserWithBootcamps,
  getUsersWithBootcamps,
  updateUserById,
  deleteUserById,
  getUserById 
};
