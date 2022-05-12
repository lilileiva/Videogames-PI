const { Videogame, Genre } = require("../db.js");
const axios = require('axios');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const { API_KEY } = process.env;
const API_KEY = 'a6c41594b31847f4a1ccae2383e45fee';

let games = [];
let gamesByName = [];

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

        } catch (error) {
            return res.status(404).json({ msg: "Videogames not found" });
        }
    }
}

/*--------------------------------( /videogames/:id )--------------------------------*/

const getVideogameById = async (req, res) => {

    const { id } = req.query;

    try {
        let json = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        let gameApi = json.data.results.map(game => {
            return {
                id: game.id,
                name: game.name,
                genre: game.genres.map(genre => genre.name),
                rating: game.rating,
                img: game.background_image
            }
        });

        let gameBd = await Videogame.findByPk(
            id,
            {
                include: {
                    model: Genre,
                }
            }
        );
        gameBd = gameBd.map(game => {
            return {
                id: game.id,
                name: game.name,
                genre: game.genres.map(genre => genre.name),
                rating: game.rating,
                img: game.img
            }
        })

        if (gameApi.length) return res.json(gameApi);
        if (gameBd.length) return res.json(gameBd);
        else return res.json("Game not found");

    } catch (err) {
        return res.json("Game not found. Invalid ID")
    }
}

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

const getGenres = async (req, res) => {

    let json = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    let genresApi = json.data.results.map(genre => genre.name);

    let genres = await Promise.all(genresApi.map(async genre => {
        return await Genre.findOrCreate({
            where: {
                name: genre.name
            }
        })
    }))
    return res.json(genres);
}

module.exports = {
    getVideogames,
    createVideogame,
    getVideogamesByName,
    getVideogameById,
    getGenres
}