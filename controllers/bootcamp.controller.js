const { Bootcamp } = require('../models');

const bootcamps = [
  {
    title: 'Introduciendo El Bootcamp De React.',
    cue: 10,
    description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.'
  },
  {
    title: 'Bootcamp Desarrollo Web Full Stack.',
    cue: 12,
    description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.'
  },
  {
    title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning.',
    cue: 18,
    description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados'
  }
];

const createBootcamps = async () => {
  for (let bootcamp of bootcamps) {
    const createdBootcamp = await Bootcamp.create(bootcamp);
    console.log(`>> Creado el bootcamp: ${JSON.stringify(createdBootcamp, null, 2)}`);
  }
};

const listBootcampsWithUsers = async (req, res) => {
  const bootcamps = await Bootcamp.findAll({
    include: 'User'
  });
  res.json(bootcamps);
};

module.exports = {
  createBootcamps,
  listBootcampsWithUsers
};
