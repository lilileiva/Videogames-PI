const { Videogame, Genre } = require("../db.js");
const axios = require('axios');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const { API_KEY } = process.env;
const API_KEY = 'a6c41594b31847f4a1ccae2383e45fee';


//-------------TODOS LOS VIDEOJUEGOS--------------------
//----------Logica para traer Info de API --------------
const getApiInfo = async () => {
    const apiGamesInfo = 5;
    // trae los 100 videoGames (20 por cada llamado)
    const games = [];
  
    for (let i = 1; i <= apiGamesInfo; i++) {
      const { data } = await axios.get(`https://api.rawg.io/api/games`, {
        params: { key: API_KEY, page: i },
      });
  
      data.results.map((game) => {
        games.push({
          id: game.id,
          name: game.name,
          description: game.description,
          released: game.released,
          image: game.background_image,
          rating: game.rating,
          platforms: game.platforms.map((e) => e.platform.name),
          genres: game.genres.map((e) => e.name),
        });
      });
    }
  
    return games;
  };
  
  //----------Logica para traer Info de Data Base --------------
  const getDBInfo = async () => {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        // through: {
        //   attributes: [],
        // },
      },
    });
  };
  
  //Acoplo toda la info, API + DB
  const getAllInfo = async () => {
    const apiInfo = await getApiInfo();
    let bdInfo = await getDBInfo();
  
    bdInfo = bdInfo.map((e) => {
      return {
        id: e.dataValues.id,
        name: e.dataValues.name,
        description: e.dataValues.description,
        released: e.dataValues.released,
        rating: e.dataValues.rating,
        platforms: e.dataValues.platforms,
        image: e.dataValues.image,
        createdInDb: true,
        genres: e.dataValues.genres.map((e) => e.dataValues.name),
      };
    });
  
    const infoTotal = bdInfo.concat(apiInfo);
  
    // console.log(bdInfo);
    return infoTotal;
  };
  