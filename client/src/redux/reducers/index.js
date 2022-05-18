import {
    GET_VIDEOGAMES,
    ADDED_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_VIDEOGAME_BY_ID,
    CREATE_VIDEOGAME,
    GET_GENRES,
    FILTER_GENRES,
    ORDER_RATING,
    ORDER_ALPHABET
} from '../actions';


const initialState = {
    videogamesLoaded: [],
    addedVideogamesLoaded: [],
    genresLoaded: [],
    videogameDetail: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === GET_VIDEOGAMES_BY_NAME) {
        return {
            ...state,
            videogamesLoaded: action.payload
        }
    }
    else if (action.type === GET_VIDEOGAMES) {
        return {
            ...state,
            videogamesLoaded: action.payload
        }
    }
    else if (action.type === ADDED_VIDEOGAMES) {
        return {
            ...state,
            addedVideogamesLoaded: action.payload
        }
    }
    else if (action.type === GET_VIDEOGAME_BY_ID) {
        return {
            ...state,
            videogameDetail: action.payload
        }
    }
    else if (action.type === GET_GENRES) {
        return {
            ...state,
            genresLoaded: action.payload
        }
    }
    else if (action.type === CREATE_VIDEOGAME) {
        return {
            ...state
        }
    }
    else if (action.type === FILTER_GENRES) {
        const videogamesByGenres = state.videogamesLoaded.filter((game) => game.genres.includes(action.payload))

        return {
            ...state,
            videogamesLoaded: videogamesByGenres
        }
    }
    else if (action.type === ORDER_RATING) {
        // if (action.payload === 'Low to high') {
        //     const videogamesByRating = state.videogamesLoaded.map((game) => game.rating.sort(function (a, b) {return (a - b)}))

        //     return {
        //         ...state,
        //         videogamesLoaded: videogamesByRating
        //     }
        // }
        // else if (action.payload === 'High to low') {
        //     const videogamesByRating = state.videogamesLoaded.map((game) => game.rating.sort(function (a, b) {return (b - a)}))

        //     return {
        //         ...state,
        //         videogamesLoaded: videogamesByRating
        //     }
        // }


        let videogamesByRating = action.payload === "low"
          ? state.videogamesLoaded.sort(function (a, b) {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            })
          : state.videogamesLoaded.sort(function (a, b) {
              if (a.rating > b.rating) {
                return -1;
              }
              if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        videogamesLoaded: videogamesByRating,
      };
    }
    else if (action.type === ORDER_ALPHABET) {
        if (action.payload === 'A') {
            const videogamesByAlphabet = state.videogamesLoaded.map((game) => game.name).sort()

            return {
                ...state,
                videogamesLoaded: videogamesByAlphabet
            }
        }
        else if (action.payload === 'Z') {
            const videogamesByAlphabet = state.videogamesLoaded.map((game) => game.name).sort().reverse()

            return {
                ...state,
                videogamesLoaded: videogamesByAlphabet
            }
        }
    }
    return state;
}

export default rootReducer;