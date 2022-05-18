import React, { useEffect } from 'react';
import styles from './Videogame.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, createVideogame, getGenres } from '../../redux/actions';


export default function Videogame() {
    const dispatch = useDispatch();

    let platformsList = []
    const videogamesLoaded = useSelector((state) => state.videogamesLoaded);

    const genresLoaded = useSelector((state) => state.genresLoaded);

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getVideogames())
    }, [dispatch]);

    const [input, setInput] = React.useState({
        name: "",
        description: "",
        released: "",
        platforms: [],
        genres: [],
        img: ""
    });

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createVideogame(input))
    }

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
                            videogamesLoaded.map((game) => {
                                return (
                                    <option>
                                        {game.platforms}
                                    </option>
                                )
                            })

                        }
                    </select>
                    {/* <select className={styles.inputs} name='platforms' value={input.platforms} onChange={e => handleInputChange(e)}>
                        <option value='null'>Platforms</option>
                        <option>Playstation 3</option>
                        <option>Xbox 360</option>
                        <option>PC</option>
                    </select> */}
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
                    <input type="submit" value='Create' className={styles.btn} />
                </form>
            </div>
        </div>
    )
}