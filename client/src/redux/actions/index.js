export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";


export function getVideogames() {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/videogames`)
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
    return async function (dispatch) {
        try {
            return fetch(`http://localhost:3001/videogames?name=${name}`)
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: "GET_VIDEOGAMES_BY_NAME",
                        payload: data
                    })
                })
        } catch (error) {
            return console.log(error)
        }
    }
};


export function getVideogameById(id) {
    return async function (dispatch) {
        try {
            return fetch(`http://localhost:3001/videogames/${id}`)
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: "GET_VIDEOGAME_BY_ID",
                        payload: data
                    })
                })
        } catch (error) {
            return console.log(error)
        }
    }
};


export function createVideogame() {
    return function (dispatch) {
        return (
            fetch(`/videogame`)
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: "CREATE_VIDEOGAME",
                        payload: data
                    })
                })
        )
    }
};

export function getGenres() {
    return async function (dispatch) {
        // return (
        //     fetch(`/genres`)
        //         .then(res => res.json())
        //         .then(data => {
        //             dispatch({
        //                 type: "GET_GENRES",
        //                 payload: data
        //             })
        //         })
        // )
        let response = fetch('/genres')
        return dispatch({
            type: "GET_GENRES",
            payload: response.data
        })
    }
};

