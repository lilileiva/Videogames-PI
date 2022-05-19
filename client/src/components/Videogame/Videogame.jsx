import React, { useEffect, useState } from 'react';
import styles from './Videogame.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, createVideogame, getGenres } from '../../redux/actions';


export default function Videogame() {
    const dispatch = useDispatch();
    /*---------------------------*/
    const genresLoaded = useSelector((state) => state.genresLoaded);
    const videogamesLoaded = useSelector((state) => state.videogamesLoaded);
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames());
    }, [dispatch]);
    /*---------------------------*/
    let platformsList = [];
    videogamesLoaded.map((game) => (
        platformsList.push(game.platforms)
    ))
    platformsList = platformsList.toString().split(', ').toString().split(',');
    function removeDuplicates(arr) {
        var unique = [];
        arr.forEach(element => {
            if (!unique.includes(element)) {
                unique.push(element);
            }
        });
        return unique;
    }
    platformsList = removeDuplicates(platformsList);
    /*---------------------------*/
    const [input, setInput] = React.useState({
        name: "",
        description: "",
        released: "",
        platforms: [],
        genres: [],
        img: ""
    });
    /*---------------------------*/
    const validate = (input) => {
        let errors = {};
        if (!input.name) {
            errors.name = 'Name required'
        }
        else if (isNaN(input.rating)) {
            errors.rating = 'Rating must be a number'
        }
        if (!input.description) {
            errors.description = 'Description required'
        }
        if (!input.platforms) {
            errors.platforms = 'PLatform required'
        }
        if (!input.genres) {
            errors.genres = 'Genre required'
        }
        return errors
    }
    const [errors, setErrors] = useState(validate(input));
    /*---------------------------*/
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    function handleGenres(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value],
        });
    }
    function handlePlataforms(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value],
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createVideogame(input))
    }
    /*---------------------------*/
    return (
        <div className={styles.container}>
            <div className={styles.createVideogame}>
                <h2>Create videogame</h2>
                <form>
                    <input
                        type="text"
                        placeholder='Name*'
                        className={styles.inputs}
                        name='name'
                        value={input.name}
                        onChange={e => handleInputChange(e)}
                    />
                    <textarea
                        type="text"
                        placeholder='Description*'
                        className={styles.inputs}
                        name='description'
                        value={input.description}
                        onChange={e => handleInputChange(e)}
                    />
                    <select className={styles.inputs}>
                        <option value='null'>Genres</option>
                        {
                            genresLoaded
                                ? genresLoaded.map((genre) => {
                                    return (
                                        <option name='genres' value={input.genres} onChange={e => handleInputChange(e)}>
                                            {genre.name}
                                        </option>
                                    )
                                })
                                : null
                        }
                    </select>
                    <select className={styles.inputs}>
                        <option value='null'>Platforms</option>
                        {
                            platformsList.length < 21
                                ? <option>Cargando...</option>
                                : platformsList.length !== 0
                                    ? platformsList.map((platform) => (
                                        <option>{platform}</option>
                                    ))
                                    : null
                        }
                    </select>
                    <input
                        type="date"
                        placeholder='Released date'
                        className={styles.inputs}
                        name='released'
                        value={input.released}
                        onChange={e => handleInputChange(e)}
                    />
                    <label for="img">Select image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.inputs}
                        id='img'
                        name='img'
                        value={input.img}
                        onChange={e => handleInputChange(e)}
                    />
                    <input type="submit" value='Create' className={styles.btn} onSubmit={e => handleSubmit(e)} />
                </form>
            </div >
        </div >
    )
}