const { Videogame, Genre } = require("../db.js");
const axios = require('axios');
const { Sequelize } = require('sequelize');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const { API_KEY } = process.env;
const API_KEY = '6bcb2db2bdaa45649f761187d112082d';


/*--------------------------( /videogames y /videogames?name="..." )---------------------------*/
const getVideogames = async (req, res) => {
    const { name } = req.query;

    if (name) {
        try {
            let gamesByName = [];

            const apiVideogames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            let apiVideogamesRes = apiVideogames.data.results;
            apiVideogamesRes.map((game) => {
                gamesByName.push({
                    id: game.id,
                    name: game.name,
                    genres: game.genres ? game.genres.map((genre) => genre.name).join(', ') : null,
                    img: game.background_image,
                    rating: game.rating,
                    platforms: game.platforms ? game.platforms.map((p) => p.platform.name).join(', ') : null
                })
            })

            const bdVideogames = await Videogame.findAll({
                where: {
                    name: { [Sequelize.Op.iLike]: `%${name}%` }
                },
                include: {
                    model: Genre
                }
            })
            bdVideogames.map(game => {
                gamesByName.unshift({
                    id: game.id,
                    img: game.img ? game.img : null,
                    name: game.name,
                    genres: game.Genres.map((genre) => genre.name).join(', '),
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms,
                })
            });

            if (gamesByName) {
                return res.status(200).json(gamesByName)
            }
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: 'There was an error...' })
        }
    } else {
        try {
            let games = [];
            let pages = 8;
            for (let i = 1; i < pages; i++) {
                const apiVideogames = await axios.get(`https://api.rawg.io/api/games?page=${i}&key=${API_KEY}`)
                let apiVideogamesRes = apiVideogames.data.results;

                apiVideogamesRes.map(game => {
                    games.push({
                        id: game.id,
                        name: game.name,
                        genres: game.genres.map((genre) => genre.name).join(', '),
                        img: game.background_image,
                        rating: game.rating,
                        platforms: game.platforms.map((p) => p.platform.name).join(', ')
                    })
                })
            }

            const bdVideogames = await Videogame.findAll({
                include: {
                    model: Genre
                }
            });
            bdVideogames.map(game => {
                games.unshift({
                    id: game.id,
                    img: game.img ? game.img : null,
                    name: game.name,
                    genres: game.Genres.map((genre) => genre.name).join(', '),
                    description: game.description,
                    released: game.released,
                    rating: game.rating,
                    platforms: game.platforms,
                })
            });
            if (games) {
                return res.status(200).json(games)
            }
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: 'There was an error...' })
        }
    }
}

/*--------------------------------( /videogames/:id )--------------------------------*/
const getVideogameById = async (req, res) => {
    const { id } = req.params;

    if (id.length < 36) {
        try {
            const apiVideogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            let apiVideogameRes = apiVideogame.data;

            apiVideogameRes = {
                id: apiVideogameRes.id,
                name: apiVideogameRes.name,
                description: apiVideogameRes.description_raw,
                released: apiVideogameRes.released,
                genres: apiVideogameRes.genres.map((genre) => genre.name).join(', '),
                img: apiVideogameRes.background_image,
                rating: apiVideogameRes.rating,
                platforms: apiVideogameRes.platforms.map((e) => e.platform.name).join(', ')
            };
            return res.status(200).json(apiVideogameRes);
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: "Videogame not found. Invalid ID." });
        }
    } else {
        try {
            let bdVideogame = await Videogame.findOne({
                where: {
                    id: id,
                },
                include: {
                    model: Genre,
                    attributes: ["id", "name"],
                    through: { attributes: [] },
                },
            });
            let bdVideogameRes = {
                id: bdVideogame.id,
                img: bdVideogame.img ? bdVideogame.img : null,
                name: bdVideogame.name,
                genres: bdVideogame.Genres.map((genre) => genre.name).join(', '),
                description: bdVideogame.description,
                released: bdVideogame.released,
                rating: bdVideogame.rating,
                platforms: bdVideogame.platforms,
            };
            return res.status(200).json(bdVideogameRes);
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error: "Videogame not found. Invalid ID." });
        }
    }
}

/*--------------------------------( /videogames/added )--------------------------------*/
const addedVideogames = async (req, res) => {
    try {
        let bdVideogames = await Videogame.findAll({
            include: [
                {
                    model: Genre,
                    attributes: ["id", "name"]
                }
            ]
        });
        let bdVideogamesRes = bdVideogames.map(game => {
            return {
                id: game.id,
                img: game.img ? game.img : null,
                name: game.name,
                genres: game.Genres.map((genre) => genre.name).join(', '),
                description: game.description,
                released: game.released,
                rating: game.rating,
                platforms: game.platforms,
            }
        });
        if (bdVideogames) return res.status(200).json(bdVideogamesRes)
        else return res.json('No videogames added.')
    } catch (error) {
        return res.status(404).json({ error: 'There was an error...' })
    }
}

/*--------------------------------( /videogame )--------------------------------*/
const createVideogame = async (req, res) => {
    let { name, description, released, rating, platforms, genres, img } = req.body;
    platforms = platforms.toString()
    rating = Number(rating)

    if (!name || typeof name !== "string") {
        return res.status(404).json({ error: "Invalid name" });
    }
    if (!description || typeof description !== "string") {
        return res.status(404).json({ error: "Invalid description" });
    }
    if (!platforms || typeof platforms !== "string") {
        return res.status(404).json({ error: "Invalid platforms" });
    }
    if (!genres || typeof genres !== "object") {
        return res.json({ error: "Invalid genres" });
    }
    if (rating) {
        if (typeof rating !== "number") {
            return res.status(404).json({ error: "Invalid rating" });
        }
    }
    if (img && !(img.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g))) {
        return res.status(404).json({ error: "Invalid image" });
    }

    try {
        let newGame = await Videogame.create({
            name,
            description,
            released,
            rating,
            platforms,
            img
        })
        let genresNewGame = await Genre.findAll({
            where: {
                name: genres
            }
        });
        await newGame.setGenres(genresNewGame);
        res.status(200).send("Videogame created succesfully!");
    } catch (error) {
        console.error(error)
        return res.status(404).json({ error: "There was an error..." })
    }
}

/*--------------------------------( /genres )--------------------------------*/
const getGenres = async (req, res) => {
    try {
        const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
        let apiGenresRes = await apiGenres.data.results;
        apiGenresRes.map((genre) => {
            Genre.findOrCreate({
                where: {
                    name: genre.name
                }
            })
        })
        const genres = await Genre.findAll();

        return res.status(200).json(genres);
    } catch (error) {
        return res.status(404).json({ error: 'There was an error...' });
    }
}


module.exports = {
    getVideogames,
    addedVideogames,
    getVideogameById,
    createVideogame,
    getGenres
}