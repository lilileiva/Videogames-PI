import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Genres.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterGenres } from '../../redux/actions';


function Genres() {
    const dispatch = useDispatch();

    const genresLoaded = useSelector((state) => state.genresLoaded)
    const videogamesLoaded = useSelector((state) => state.videogamesLoaded)

    useEffect(() => {
        dispatch(filterGenres('action'))
    }, [dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.genres}>
                <select>
                    <option value='null'>Genres</option>
                    {
                        genresLoaded
                            ? genresLoaded.map((genre) => {
                                return (
                                    <option>{genre.name}</option>
                                )
                            })
                            : null
                    }
                </select>
                <ul>
                    {
                        videogamesLoaded
                            ? videogamesLoaded.map((game) => (
                                <li key={game.id} className={styles.card}>
                                    {
                                        game.img
                                            ? <img className={styles.image} src={game.img} alt='videogame poster' />
                                            : <img className={styles.image} src='https://wallpaperaccess.com/full/2389962.jpg' alt='videogame poster' />
                                    }
                                    <div className={styles.text}>
                                        <Link to={`/videogames/${game.id}`}>
                                            <p className={styles.title}>{game.name}</p>
                                        </Link>
                                        <div className={styles.description}>
                                            <span>{game.genres}</span>
                                            <span className={styles.rating}>{game.rating}</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                            : null
                    }

                    {/* {
                        genres
                            ? genres.name.map((game) => (
                                <li>
                                    <p>{game.name}</p>
                                    <p>{game.released}</p>
                                    <img src={game.img} alt='videogame poster' />
                                </li>
                            ))
                            : <p>No genres...</p>
                    } */}
                </ul>
            </div>
        </div>
    )
}

export default Genres;