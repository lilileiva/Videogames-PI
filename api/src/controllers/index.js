const { Videogame, Genre } = require("../db.js");
const axios = require('axios');
const fetch = import('node-fetch');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const { API_KEY } = process.env;
const API_KEY = 'a6c41594b31847f4a1ccae2383e45fee';

let genres = [];
let games = [];
let gamesByName = [];
let gameById = {};

/*--------------------------( /videogames y /videogames?name="..." )---------------------------*/
const getVideogames = async (req, res) => {
    const { name } = req.query;

    //----------videogames by name---------------
    if (name) {
        const apiVideogamesByName = async () => {
            fetch(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
                .then(res => res.json())
                .then(data => {
                    data.results.map((game) => {
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
                    nombre: name.toLowerCase()
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

        await apiVideogamesByName();
        await bdVideogamesByName();

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
            return res.status(404).json({ error: "Videogames by name not found" });
        }
    }

    //---------------------todos los resultados---------------------------
    const apiVideogames = async () => {
        const response = fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
        const json = await response.json()

        json.results.map((game) => {
            return {
                id: game.id,
                name: game.name,
                genre: game.genres.map(genre => genre.name),
                rating: game.rating,
                img: game.background_image
            }
        })

    }

    const bdVideogames = async () => {
        let bdVideogame = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ['name']
            }
        })
        bdVideogame = bdVideogame.map((game) => {
            return {
                id: game.dataValues.id,
                name: game.dataValues.name,
                genre: game.dataValues.genres.map(genre => genre.name),
                rating: game.dataValues.rating,
                img: game.dataValues.background_image
            }
        })
    }

    let apiVideogame = await apiVideogames();
    let bdVideogame = await bdVideogames();

    try {

        games = games.push(apiVideogame.concat(bdVideogame))

        return res.json(games);
        // return res.status(200).json(games)

    } catch (error) {
        return res.status(404).json({ error: "Videogames not found" });
    }
}

/*--------------------------------( /videogames/:id )--------------------------------*/
const getVideogameById = async (req, res) => {
    const { id } = req.params;

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
            return res.status(200).json(gameById);
        } catch (error) {
            return res.status(404).json({ error: "Videogame not found. Invalid ID." });
        }
    }
}

/*--------------------------------( /videogame )--------------------------------*/

const createVideogame = async (req, res) => {

    const { name, description, released, rating, platforms, genres, img } = req.body;

    if (!name || typeof name !== "string")
        return { error: "Invalid Name" };
    if (!description || typeof description !== "string")
        return { error: "Invalid description" };
    if (!img) {
        img = 'https://creazilla-store.fra1.digitaloceanspaces.com/emojis/45317/video-game-emoji-clipart-md.png';
    }

    try {
        let genresNewGame = await Genre.findAll({
            where: {
                name: genres
            },
        });

        let newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            img
        })
        await newGame.addGenres(genresNewGame);
        res.send("Videogame created succesfully!");
    } catch (error) {
        res.status(404).json(error)
    }
}

/*--------------------------------( /genres )--------------------------------*/

//modificar
const getGenres = async (req, res) => {
    const apiGenres = async () => {
        fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then(res => res.json)
            .then(data => {
                data.results.map((genre) => {
                    genres.push({
                        id: genre.id,
                        name: genre.name,
                    })
                })
            })
    }

    await apiGenres();

    let saveGenres = genres.map(async genre => {
        return await Genre.findOrCreate({
            where: {
                id: genre.id,
                name: genre.name
            }
        })
    })
    return res.json(saveGenres);
}


module.exports = {
    getVideogames,
    createVideogame,
    getVideogameById,
    getGenres
}