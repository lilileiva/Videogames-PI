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

            const apiVideogames = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
            let apiVideogamesRes = apiVideogames.data.results;
            apiVideogamesRes = apiVideogamesRes.map(g => {
                return {
                    id: g.id,
                    name: g.name,
                    genre: g.genres.map(ge => ge.name).join(', '),
                    img: g.background_image,
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
                    genre: g.genres.map(ge => ge.name).join(', '),
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
            console.log({ error: 'Videogames by name not found.' })
        }
    } else {
        let games = [];

        const apiVideogames = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        let apiVideogamesRes = apiVideogames.data.results;
        apiVideogamesRes = apiVideogamesRes.map(game => {
            return {
                id: game.id,
                name: game.name,
                genres: game.genres.map(genre => genre.name).join(', '),
                img: game.background_image,
                rating: game.rating
            }
        })

        const bdVideogames = await Videogame.findAll({
            include: {
                model: Genre
            }
        });
        const bdVideogamesRes = bdVideogames.map(g => {
            return {
                id: g.id,
                name: g.name,
                genre: g.genres.map(ge => ge.name).join(', '),
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
    // const { id } = req.params;
    // let gameById = {};

    // try {
    //     const apiVideogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    //     let apiVideogameRes = apiVideogame.data;
    //     apiVideogameRes = apiVideogameRes.map(g => {
    //         return {
    //             id: g.id,
    //             name: g.name,
    //             genre: g.genres.map(ge => ge.name),
    //             img: g.background_image,
    //             rating: g.rating
    //         }
    //     })

    //     // gameById = [...apiVideogameRes, bdVideogameRes]
    //     console.log(apiVideogameRes)
    //     return res.status(200).json(apiVideogameRes)
    // } catch (error) {
    //     return res.status(404).json({ error: "Videogame not found. Invalid ID." });
    // }


    const { id } = req.params;

    if (id.length < 36) {
        try {
            const apiVideogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            let apiVideogameRes = apiVideogame.data;

            apiVideogameRes = {
                name: apiVideogameRes.name,
                description: apiVideogameRes.description_raw,
                released: apiVideogameRes.released,
                genres: apiVideogameRes.genres.map((genre) => genre.name).join(', '),
                img: apiVideogameRes.background_image,
                rating: apiVideogameRes.rating,
                platforms: apiVideogameRes.platforms.map((e) => e.platform.name).join(', ')
            };

            return res.status(200).send(apiVideogameRes);
        } catch (error) {
            return res.status(404).json({ error: "Videogame not found. Invalid ID." });
        }

    }
    // let gameDB = await Videogame.findOne({
    //     where: {
    //         id: id,
    //     },
    //     include: {
    //         model: Genre,
    //         attributes: ["name"],
    //         through: { attributes: [] },
    //     },
    // });
    // let genres = gameDB.genres.map((genre) => genre.name);

    // let foundGame = {
    //     image: gameDB.image,
    //     name: gameDB.name,
    //     genres: genres,
    //     description: gameDB.description,
    //     released: gameDB.released,
    //     rating: gameDB.rating,
    //     platforms: gameDB.platforms,
    // };
    // return res.status(200).json(foundGame);



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
        res.status(404).json({ error: "There was an error. Try again." })
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