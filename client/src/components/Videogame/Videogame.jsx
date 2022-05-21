import React, { useEffect, useState } from 'react';
import styles from './Videogame.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, createVideogame, getGenres } from '../../redux/actions';


export default function Videogame() {
    const dispatch = useDispatch();

    const genresLoaded = useSelector((state) => state.genresLoaded);
    const videogamesLoaded = useSelector((state) => state.videogamesLoaded);
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames());
    }, [dispatch]);

    let platformsList = [];
    function removeDuplicates(arr) {
        var unique = [];
        arr.forEach(element => {
            if (!unique.includes(element)) {
                unique.push(element);
            }
        });
        return unique;
    }
    videogamesLoaded.map((game) => (
        platformsList.push(game.platforms)
    ))
    platformsList = platformsList.toString().split(', ').toString().split(',')
    platformsList = removeDuplicates(platformsList)


    const [input, setInput] = React.useState({
        name: "",
        description: "",
        released: "",
        platforms: [],
        genres: [],
        img: ""
    });

    const validate = (input) => {
        let errors = {};
        if (!input.name) {
            errors.name = 'Name required'
        }
        if (!input.description) {
            errors.description = 'Description is required'
        }
        if (!input.platforms.length === 0) {
            errors.platforms = 'At least a platform is required'
        }
        if (!input.genres.length === 0) {
            errors.genres = 'At least a genre is required'
        }
        return errors
    }
    const [inputErrors, setInputErrors] = useState({})

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }
    function handleGenres(e) {
        setInput({
            ...input,
            genres: [...input.genres.filter(p => p !== e.target.value), e.target.value],
        });
    }
    function handlePlatforms(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value],
        });
    }
    const [isSubmit, setIsSubmit] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setInputErrors(validate(input))
        dispatch(createVideogame(input))
        setIsSubmit(true);
    }

    useEffect(() => {
        console.log(inputErrors)
        if (Object.keys(inputErrors).length === 0 && isSubmit) {
            console.log(input)
        }
    }, [inputErrors])

    return (
        <div className={styles.container}>
            <div className={styles.createVideogame}>
                <h2>Create videogame</h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder='Name*'
                        className={styles.inputs}
                        name='name'
                        value={input.name}
                        onChange={e => handleInputChange(e)}
                    />
                    {/* {errors.name && <p className={styles.error}>{errors.name}</p>} */}
                    <textarea
                        type="text"
                        placeholder='Description*'
                        className={styles.inputs}
                        name='description'
                        value={input.description}
                        onChange={e => handleInputChange(e)}
                    />
                    {/* {errors.description && <p className={styles.error}>{errors.description}</p>} */}
                    <div className={styles.genresCheckbox}>
                        <span>Genres*</span>
                        {
                            genresLoaded.length < 15
                                ? <option>Cargando...</option>
                                : genresLoaded.length !== 0
                                    ? genresLoaded.map((genre) => {
                                        return (
                                            <label>
                                                <input
                                                    key={genre.id}
                                                    type='checkbox'
                                                    name='genres'
                                                    value={genre.name}
                                                    onChange={e => handleGenres(e)}
                                                />
                                                {genre.name}
                                            </label>
                                        )
                                    })
                                    : null
                        }
                        {/* {errors.genres && <p className={styles.error}>{errors.genres}</p>} */}
                    </div>
                    <div className={styles.genresCheckbox}>
                        <span>Platforms*</span>
                        {
                            platformsList.length < 15
                                ? <option>Cargando...</option>
                                : platformsList.length !== 0
                                    ? platformsList.map((platform) => {
                                        return (
                                            <label>
                                                <input
                                                    key={platform}
                                                    type='checkbox'
                                                    name='platforms'
                                                    value={platform}
                                                    onChange={e => handlePlatforms(e)}
                                                />
                                                {platform}
                                            </label>
                                        )
                                    })
                                    : null
                        }
                        {/* {errors.platforms && <p className={styles.error}>{errors.platforms}</p>} */}
                    </div>
                    <input
                        type='number'
                        placeholder='rating'
                        min='0'
                        max='5'
                        className={styles.inputs}
                        value={input.rating}
                        onChange={e => handleInputChange(e)}
                    />
                    <input
                        type="date"
                        placeholder='Released date'
                        className={styles.inputs}
                        name='released'
                        value={input.released}
                        onChange={e => handleInputChange(e)}
                    />
                    <label>
                        <span className={styles.inputs}>Select image...</span>
                        <input
                            type="file"
                            accept="image/*"
                            // className={styles.inputs}
                            style={{ display: 'none' }}
                            name='img'
                            value={input.img}
                            onChange={e => handleInputChange(e)}
                        />
                    </label>
                    <input type="submit" className={styles.btn} />
                </form>
            </div >
        </div >
    )
}