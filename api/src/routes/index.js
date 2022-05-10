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

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideogames);
router.post('/videogame', createVideogame);
router.get('/videogames/:name', getVideogamesByName); //name por query GET /videogames?name="...":
router.get('/videogame/:id', getVideogamesById); //name por params GET /videogame/{idVideogame}:
router.get('/genres', getGenres); //traerlos de api y luego guardar en db


module.exports = router;
