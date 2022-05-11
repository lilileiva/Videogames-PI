const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    getVideogames,
    createVideogame,
    getVideogamesByName,
    getVideogameById,
    getGenres
} = require('../controllers');

// const { getVideogames } = require('../controllers/videogames.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideogames);
router.post('/videogame', createVideogame);
// router.get('/videogames/:name', getVideogamesByName);
router.get('/videogame/:id', getVideogameById);
router.get('/genres', getGenres);


module.exports = router;
