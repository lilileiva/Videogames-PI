const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
    getVideogames,
    addedVideogames,
    getVideogameById,
    createVideogame,
    getGenres
} = require('../controllers');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideogames);
router.get('/videogames/added', addedVideogames);
router.get('/videogames/:id', getVideogameById);
router.post('/videogame', createVideogame);
router.get('/genres', getGenres);


module.exports = router;
