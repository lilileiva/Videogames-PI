import {
    GET_VIDEOGAMES,
    ADDED_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_VIDEOGAME_BY_ID,
    CREATE_VIDEOGAME,
    GET_GENRES,
    FILTER_GENRES,
    ORDER_RATING,
    ORDER_ALPHABET,
    GET_ALL_VIDEOGAMES
} from '../actions';


const initialState = {
    videogamesLoaded: [],
    allVideogames: [],
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
    else if (action.type === GET_ALL_VIDEOGAMES) {
        return {
            ...state,
            videogamesLoaded: state.allVideogames
        }
    }
    else if (action.type === GET_VIDEOGAMES) {
        return {
            ...state,
            videogamesLoaded: action.payload,
            allVideogames: action.payload
        }
    }
    else if (action.type === ADDED_VIDEOGAMES) {
        return {
            ...state,
            videogamesLoaded: action.payload
        }
    }
    else if (action.type === GET_VIDEOGAME_BY_ID) {
        return {
            ...state,
            videogameDetail: action.payload
        }
    }
    else if (action.type === CREATE_VIDEOGAME) {
        return {
            ...state,
            videogamesLoaded: [...state.videogamesLoaded, action.payload],
            allVideogames: [...state.allVideogames, action.payload]
        }
    }
    else if (action.type === GET_GENRES) {
        return {
            ...state,
            genresLoaded: action.payload
        }
    }
    else if (action.type === FILTER_GENRES) {
        let filtered = [];
        let videogamesLoaded = [...state.allVideogames]
        videogamesLoaded.map(game => [game.genres].toString().split(', ').toString().split(',').includes(action.payload) ? filtered.push(game) : null)
        return {
            ...state,
            videogamesLoaded: filtered
        };
    }
    else if (action.type === ORDER_ALPHABET) {
        let filtered = [];
        let videogamesLoaded = [...state.videogamesLoaded]
        if (action.payload === "AZ") {
            let filterAlphabet = videogamesLoaded.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            })
            filtered = [...filterAlphabet]
        }
        else if (action.payload === "ZA") {
            let filterAlphabet = videogamesLoaded.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            filtered = [...filterAlphabet]
        }
        return {
            ...state,
            videogamesLoaded: filtered,
            allVideogames: state.allVideogames
        }
    }
    else if (action.type === ORDER_RATING) {
        let filtered = [];
        let videogamesLoaded = [...state.videogamesLoaded]
        if (action.payload === 'low') {
            let filterRating = videogamesLoaded.sort(function (a, b) {
                if (a.rating > b.rating) {
                    return 1;
                }
                if (b.rating > a.rating) {
                    return -1;
                }
                return 0;
            })
            filtered = [...filterRating]
        }
        else if (action.payload === 'high') {
            let filterRating = videogamesLoaded.sort(function (a, b) {
                if (a.rating > b.rating) {
                    return -1;
                }
                if (b.rating > a.rating) {
                    return 1;
                }
                return 0;
            });
            filtered = [...filterRating]
        }
        return {
            ...state,
            videogamesLoaded: filtered,
            allVideogames: state.allVideogames
        }
    }
    return state;
}

export default rootReducer;