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
            videogamesLoaded: action.payload,
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
    else if (action.type === CREATE_VIDEOGAME) {
        return {
            ...state,
            videogamesLoaded: [...state.videogamesLoaded, action.payload],
            videogameDetail: action.payload
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
        state.videogamesLoaded.map(game => [game.genres].toString().split(', ').toString().split(',').includes(action.payload) ? filtered.unshift(game) : filtered.push(game))
        return {
            ...state,
            videogamesLoaded: filtered
        };
    }
    else if (action.type === ORDER_ALPHABET) {
        if (action.payload === "AZ") {
            state.videogamesLoaded.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                videogamesLoaded: state.videogamesLoaded
            }
        }
        else if (action.payload === "ZA") {
            state.videogamesLoaded.sort(function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                videogamesLoaded: state.videogamesLoaded
            }
        }
    }
    else if (action.type === ORDER_RATING) {
        if (action.payload === 'low') {
            state.videogamesLoaded.sort(function (a, b) {
                if (a.rating > b.rating) {
                    return 1;
                }
                if (b.rating > a.rating) {
                    return -1;
                }
                return 0;
            })
            return {
                ...state,
                videogamesLoaded: state.videogamesLoaded
            }
        }
        else if (action.payload === 'high') {
            state.videogamesLoaded.sort(function (a, b) {
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
                videogamesLoaded: state.videogamesLoaded
            }
        }
    }
    return state;
}

export default rootReducer;