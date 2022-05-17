import React, { useEffect } from 'react';
import styles from './Genres.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../redux/actions';


function Genres(state) {
    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genresLoaded)

    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.genres}>
                <select>
                    <option value='null'>Genres</option>
                    {
                        genres
                            ? genres.map((genre) => {
                                return (
                                    <option>{genre.name}</option>
                                )
                            })
                            : null
                    }
                </select>
                <ul>
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