import {
    GET_VIDEOGAMES,
    ADDED_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_VIDEOGAME_BY_ID,
    CREATE_VIDEOGAME,
    GET_GENRES
} from '../actions';


const initialState = {
    videogamesLoaded: [],
    videogamesByNameLoaded: [],
    addedVideogamesLoaded: [],
    genresLoaded: [],
    videogameDetail: {}
  };

  function rootReducer(state = initialState, action) {
      if (action.type === GET_VIDEOGAMES_BY_NAME) {
          return {
              ...state,
              videogamesByNameLoaded: action.payload
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
      return state;
  }

  export default rootReducer;