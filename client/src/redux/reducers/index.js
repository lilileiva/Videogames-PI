import {
    GET_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_VIDEOGAMES_BY_NAME,
    CREATE_VIDEOGAME,
    GET_GENRES
} from '../actions';


const initialState = {
    videogamesLoaded: [],
    genresLoaded: [],
    videogameDetail: {}
  };

  function rootReducer(state = initialState, action) {
      if (action.type === GET_VIDEOGAMES) {
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
      else if (action.type === GET_VIDEOGAMES_BY_NAME) {
          return {
            ...state,
            videogamesLoaded: action.payload
          }
      }
      else if (action.type === GET_GENRES) {
          return {
            ...state,
            genresLoaded: action.payload
          }
      }
    //   else if (action.type === CREATE_VIDEOGAME) {
    //       return {
    //           ...state,
    //           moviesFavorites: state.moviesFavorites.filter(m => m.imdbID !== action.payload)
    //       }
    //   }
      return state;
  }

  export default rootReducer;