import React, { useEffect, useState } from 'react';
import styles from './Videogame.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, createVideogame, getGenres } from '../../redux/actions';


function Videogame() {
    const dispatch = useDispatch();

    const genresLoaded = useSelector((state) => state.genresLoaded);
    const videogamesLoaded = useSelector((state) => state.videogamesLoaded);
    useEffect(() => {
        if (genresLoaded.length < 18) {
            dispatch(getGenres());
        }
        if (videogamesLoaded.length === 0) {
            dispatch(getVideogames());
        }
    }, [dispatch, genresLoaded.length, videogamesLoaded.length]);

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
    if (videogamesLoaded.length >= 18) {
        videogamesLoaded.map((game) => (
            platformsList.push(game.platforms)
        ))
    }
    platformsList = platformsList.toString().split(', ').toString().split(',')
    platformsList = removeDuplicates(platformsList)

    const [form, setForm] = React.useState({
        name: "",
        description: "",
        platforms: [],
        genres: [],
        rating: "",
        released: "",
        img: ""
    });

    const validate = (form) => {
        let errors = {};
        if (!form.name) {
            errors.name = 'Name is required'
        }
        if (!form.description) {
            errors.description = 'Description is required'
        }
        if (form.platforms.length === 0) {
            errors.platforms = 'At least a platform is required'
        }
        return errors
    }
    const [formErrors, setFormErrors] = useState({})

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }
    function handleGenres(e) {
        setForm({
            ...form,
            genres: [...form.genres.filter(g => g !== e.target.value), e.target.value],
            // genres: [...form.genres, e.target.value],
        });
    }
    function handlePlatforms(e) {
        setForm({
            ...form,
            platforms: [...form.platforms.filter(p => p !== e.target.value), e.target.value],
            // platforms: [...form.platforms, e.target.value],
        });
    }
    function handleGenresDelete(genre) {
        setForm({
            ...form,
            genres: form.genres.filter(g => g !== genre)
        });
    }
    function handlePlatformsDelete(platform) {
        setForm({
            ...form,
            platforms: form.platforms.filter(p => p !== platform)
        });
    }

    const [isSubmit, setIsSubmit] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormErrors(validate(form))
        dispatch(createVideogame(form))
        setIsSubmit(true)
    }

    useEffect(() => {
        console.log(formErrors)
        if (Object.keys(formErrors).length === 0) {
            console.log(form)
        }
    }, [formErrors])

    return (
        <div className={styles.container}>
            <div className={styles.createVideogame}>
                <h2>Create videogame</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Name*'
                        className={styles.inputs}
                        name='name'
                        value={form.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && <p className={styles.error}>{formErrors.name}</p>}
                    <textarea
                        type="text"
                        placeholder='Description*'
                        className={styles.inputs}
                        name='description'
                        value={form.description}
                        onChange={handleChange}
                    />
                    {formErrors.description && <p className={styles.error}>{formErrors.description}</p>}
                    <div className={styles.genresCheckbox}>
                        <span>Genres</span>
                        {
                            genresLoaded.length < 18
                                ? <option>Cargando...</option>
                                : genresLoaded.length !== 0
                                    ? genresLoaded.map((genre) => {
                                        return (
                                            <label>
                                                <input
                                                    key={genre.id}
                                                    type='radio'
                                                    name='genres'
                                                    value={genre.name}
                                                    onChange={handleGenres}
                                                />
                                                {genre.name}
                                            </label>
                                        )
                                    })
                                    : null
                        }
                    </div>

                    <div className={styles.added}>
                        {
                            form.genres ? form.genres.map(genre => (
                                <span className={styles.added}>
                                    {genre}
                                    <button onClick={() => handleGenresDelete(genre)}>X</button>
                                </span>
                            )) : null
                        }
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
                                                    type='radio'
                                                    name='platforms'
                                                    value={platform}
                                                    onChange={handlePlatforms}
                                                />
                                                {platform}
                                            </label>
                                        )
                                    })
                                    : null
                        }
                    </div>

                    <div className={styles.added}>
                        {
                            form.platforms ? form.platforms.map(platform => (
                                <span className={styles.added}>
                                    {platform}
                                    <button onClick={() => handlePlatformsDelete(platform)}>X</button>
                                </span>
                            )) : null
                        }
                    </div>

                    {formErrors.platforms && <p className={styles.error}>{formErrors.platforms}</p>}
                    <input
                        type='number'
                        placeholder='rating'
                        min='0'
                        max='5'
                        className={styles.inputs}
                        name='rating'
                        value={form.rating}
                        onChange={handleChange}
                    />
                    <input
                        type="date"
                        placeholder='Released date'
                        className={styles.inputs}
                        name='released'
                        value={form.released}
                        onChange={handleChange}
                    />
                    {/* <label>
                        <span className={styles.inputs}>Select image...</span>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            name='img'
                            value={form.img}
                            onChange={handleChange}
                        />
                    </label> */}
                    <input
                        type="text"
                        placeholder='Insert image URL'
                        className={styles.inputs}
                        name='img'
                        value={form.img}
                        onChange={handleChange}
                    />
                    <input type="submit" className={styles.btn} />
                </form>
                {
                    isSubmit ? <span>Videogame created.</span> : null
                }
            </div >
        </div >
    )
}


export default Videogame;