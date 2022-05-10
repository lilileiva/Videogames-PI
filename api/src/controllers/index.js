const { Videogame, Genre } = require("../db.js");
const axios = require('axios');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const { API_KEY } = process.env;
const API_KEY = 'a6c41594b31847f4a1ccae2383e45fee';


const getVideogames = async (req, res) => {

    const { name } = req.query;

    if (name) {
        try {
            let json = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            let gamesApi = json.data.results.slice(0, 15).map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    genre: game.genres.map(genre => genre.name),
                    rating: game.rating,
                    img: game.background_image
                }
            });

            let gamesBd = await Videogame.findAll({
                where: {
                    name: name.toLowerCase()
                },
                include: {
                    model: Genre
                }
            })
            gamesBd = gamesBd.map(game => {
                return {
                    id: game.id,
                    name: game.name,
                    genre: game.genres.map(genre => genre.name),
                    rating: game.rating,
                    img: game.img
                }
            })

            let gamesList = [];
            gamesList = gamesList.concat(gamesApi, gamesBd).slice(0, 15);

            if (gamesList.length) return res.json(gamesList);
            else return res.json("Game not found");

        } catch (err) {
            return res.json("Game not found")
        }
    }
    let json = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    let gamesApi = json.data.results.map(game => {
        return {
            id: game.id,
            name: game.name,
            genre: game.genres.map(genre => genre.name),
            rating: game.rating,
            img: game.background_image
        }
    });
    let gamesBd = await Videogame.findAll({
        include: {
            model: Genre
        }
    });
    gamesBd = gamesBd.map(game => {
        return {
            id: game.id,
            name: game.name,
            genre: game.genres.map(genre => genre.name),
            rating: game.rating,
            img: game.img
        }
    })

    let gamesList = [];
    gamesList = gamesList.concat(gamesApi, gamesBd).slice(0, 15);
    return res.json(gamesList);
};


const createVideogame = async (req, res) => {

}

const getVideogamesByName = async (req, res) => {

}

const getVideogamesById = async (req, res) => {

}

const getGenre = async (req, res) => {

}

module.exports = {
    getVideogames,
    createVideogame,
    getVideogamesByName,
    getVideogamesById,
    getGenre
}