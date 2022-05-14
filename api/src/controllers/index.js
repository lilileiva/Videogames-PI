const { Videogame, Genre } = require("../db.js");
const axios = require('axios');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const { API_KEY } = process.env;
const API_KEY = 'a6c41594b31847f4a1ccae2383e45fee';


/*--------------------------( /videogames y /videogames?name="..." )---------------------------*/
const getVideogames = async (req, res) => {
    const { name } = req.query;

    if (name) {
        try {
            let gamesByName = [];

            const apiVideogames = async (name) => {
                const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
                return response.data.results;
            }
            const apiVideogamesRes = await apiVideogames();

            apiVideogamesRes = apiVideogamesRes.map(g => {
                return {
                    id: g.id,
                    name: g.name,
                    genre: g.genres.map(ge => ge.name),
                    img: g.img,
                    rating: g.rating
                }
            })

            const bdVideogames = await Videogame.findAll({
                where: {
                    name: name.toLowerCase()
                },
                include: {
                    model: Genre
                }
            })
            const bdVideogamesRes = bdVideogames.map(g => {
                return {
                    id: g.id,
                    name: g.name,
                    genre: g.genres.map(ge => ge.name),
                    img: g.img,
                    rating: g.rating
                }
            })

            gamesByName = [...apiVideogamesRes, bdVideogamesRes]

            if (gamesByName) {
                return res.status(200).json(gamesByName)
            } else {
                return res.json('Videogames by name not found.')
            }
        } catch (error) {
            console.log('Videogames by name not found.')
        }
    } else {
        let games = [];

        const apiVideogames = async () => {
            const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
            return response.data.results;
        }
        const apiVideogamesRes = await apiVideogames();

        const bdVideogames = await Videogame.findAll({
            include: {
                model: Genre
            }
        });
        const bdVideogamesRes = bdVideogames.map(g => {
            return {
                id: g.id,
                name: g.name,
                genre: g.genres.map(ge => ge.name),
                img: g.img,
                rating: g.rating
            }
        })

        games = [...apiVideogamesRes, bdVideogamesRes]

        return res.status(200).json(games)
    }
}

/*--------------------------------( /videogames/:id )--------------------------------*/
const getVideogameById = async (req, res) => {
    const { id } = req.params;
    let gameById = {};

    if (id) {
        try {
            const apiVideogamesById = async (id) => {
                const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
                return response.data.results;
            }
            const respgame = await apiVideogamesById();
            return res.status(200).json(respgame)
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
    let genres = [];

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
    getVideogameById,
    createVideogame,
    getGenres
}