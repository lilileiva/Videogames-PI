export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_DETAIL = "GET_VIDEOGAMES_DETAIL";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";


// export const cleanDetail = () =>{
//     return{type:CLEAN_DETAIL}
// }

export function getVideogames() {
    return function(dispatch) {
        fetch('http://localhost:3001/videogames')
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "GET_VIDEOGAMES",
                payload: data
            })
        })
    }
};

export function getVideogamesByName(name) {
    return function(dispatch) {
        fetch(`http://localhost:3001/videogames/${name}`)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "GET_VIDEOGAMES_BY_NAME",
                payload: data
            })
        })
    }
};

export function getVideogamesDetail(id) {
    return function(dispatch) {
        fetch(`http://localhost:3001/videogame/${id}`)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "GET_VIDEOGAMES_DETAIL",
                payload: data
            })
        })
    }
};

export function createVideogame() {
    return function(dispatch) {
        fetch(`http://localhost:3001/videogame`)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "CREATE_VIDEOGAME",
                payload: data
            })
        })
    }
};

export function getGenres() {
    return function(dispatch) {
        fetch(`http://localhost:3001/genres`)
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "GET_GENRES",
                payload: data
            })
        })
    }
};

