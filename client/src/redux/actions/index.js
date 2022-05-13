export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";


export function getVideogames(name) {
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


export function getVideogameById(id) {
    return async function (dispatch) {
        return fetch(`http://localhost:3001/videogame/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch({
                    type: "GET_VIDEOGAME_BY_ID",
                    payload: data
                })
            })
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

