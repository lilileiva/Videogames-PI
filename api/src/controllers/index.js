const { Videogame, Genre } = require("../db.js");
const axios = require('axios');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const { API_KEY } = process.env;
const API_KEY = 'a6c41594b31847f4a1ccae2383e45fee';

let games = [];
let gamesByName = [];
let gameById = {};
let gamesByGenre = [];

/*------------------------------( /videogames )----------------------------------*/

const apiVideogames = async () => {
    fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            data.map((game) => {
                games.push({
                    id: game.id,
                    name: game.name,
                    genre: game.genres.map(genre => genre.name),
                    rating: game.rating,
                    img: game.background_image
                })
            })
        })
}

const bdVideogames = async () => {
    const bdVideogame = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name']
        }
    })

    bdVideogame = bdVideogame.map((game) => {
        games.push({
            id: game.id,
            name: game.name,
            genre: game.genres.map(genre => genre.name),
            rating: game.rating,
            img: game.background_image
        })
    })
}

const getVideogames = async (req, res) => {
    await apiVideogames();
    await bdVideogames();

    try {
        games = games.map((game) => {
            return {
                id: game.id,
                name: game.name,
                genre: game.genres.map(genre => genre.name),
                rating: game.rating,
                img: game.background_image
            }
        })
        return res.status(200).json(games)
    } catch (error) {
        return res.status(404).json({ msg: "Videogames not found" });
    }
}

/*-------------------------------( /videogames/:name )---------------------------------*/

const apiVideogamesByName = async () => {
    fetch(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            data.map((game) => {
                gamesByName.push({
                    id: game.id,
                    name: game.name,
                    genre: game.genres.map(genre => genre.name),
                    rating: game.rating,
                    img: game.background_image
                })
            })
        })
}

const bdVideogamesByName = async () => {
    const bdVideogame = await Videogame.findAll({
        where: {
            nombre: nombre.toLowerCase()
        },
        include: {
            model: Genre,
            attributes: ['name']
        }
    })

    bdVideogame = bdVideogame.map((game) => {
        gamesByName.push({
            id: game.id,
            name: game.name,
            genre: game.genres.map(genre => genre.name),
            rating: game.rating,
            img: game.background_image
        })
    })
}

const getVideogamesByName = async (req, res) => {
    const { name } = req.query;

    await apiVideogamesByName();
    await bdVideogamesByName();

    if (name) {
        try {
            gamesByName = gamesByName.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    genre: game.genres.map(genre => genre.name),
                    rating: game.rating,
                    img: game.background_image
                }
            })
            return res.status(200).json(gamesByName);
        } catch (error) {
            return res.status(404).json({ msg: "Videogames by name not found" });
        }
    }
}

/*--------------------------------( /videogames/:id )--------------------------------*/

const apiVideogamesById = async () => {
    fetch(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            data.map((game) => {
                gameById.push({
                    id: game.id,
                    name: game.name,
                    genre: game.genres.map(genre => genre.name),
                    rating: game.rating,
                    img: game.background_image
                })
            })
        })
}

const bdVideogamesById = async () => {
    const bdVideogame = await Videogame.findByPk(id);

    bdVideogame = bdVideogame.map((game) => {
        gameById.push({
            id: game.id,
            name: game.name,
            genre: game.genres.map(genre => genre.name),
            rating: game.rating,
            img: game.background_image
        })
    })
}

const getVideogameById = async (req, res) => {
    const { id } = req.params;

    await apiVideogamesById();
    await bdVideogamesById();

    if (id) {
        try {
            gameById = gameById.map((game) => {
                return {
                    id: game.id,
                    name: game.name,
                    genre: game.genres.map(genre => genre.name),
                    rating: game.rating,
                    img: game.background_image
                }
            })
            return res.status(200).json(gamesById);
        } catch (error) {
            return res.status(404).json({ msg: "Videogames by name not found" });
        }
    }
}

/*--------------------------------( /videogame )--------------------------------*/

const createVideogame = async (req, res) => {

    const { name, description, released, rating, platforms, genre, img } = req.body;

    if (!img) {
        img = 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/45317/video-game-emoji-clipart-md.png';
    }

    let genres = await Promise.all(genre.map(async genre => (
        await Genre.findAll({
            where: {
                name: genre.name
            }
        })
    )))

    let newGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        img
    })
    await newGame.setGenres(genres.flat());
    return res.json(newGame);
}

/*--------------------------------( /genres )--------------------------------*/

const apiGenres = async () => {
    fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            data.map((game) => {
                games.push({
                    id: game.id,
                    name: game.name,
                    genre: game.genres.map(genre => genre.name),
                    rating: game.rating,
                    img: game.background_image
                })
            })
        })
}

const bdGenres = async () => {
    const bdGenre = await Genre.findAll({
        include: {
            model: Genre,
            attributes: ['name']
        }
    })

    bdGenre = bdGenre.map((game) => {
        gamesByGenre.push({
            id: game.id,
            name: game.name,
            genre: game.genres.map(genre => genre.name),
            rating: game.rating,
            img: game.background_image
        })
    })
}

const getGenres = async (req, res) => {
    await apiGenres();
    await bdGenres();

    try {
        gamesByGenre = gamesByGenre.map((game) => {
            return {
                id: game.id,
                name: game.name,
                genre: game.genres.map(genre => genre.name),
                rating: game.rating,
                img: game.background_image
            }
        })
        return res.status(200).json(gamesByGenre);
    } catch (error) {
        return res.status(404).json({ msg: "Videogames by genre not found" });
    }
}


module.exports = {
    getVideogames,
    createVideogame,
    getVideogamesByName,
    getVideogameById,
    getGenres
}