import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterGenres, orderAlphabet, orderRating, getVideogames } from '../../redux/actions';
import { useHistory } from 'react-router-dom';


export default function Sidebar() {
    const dispatch = useDispatch();

    const genresLoaded = useSelector((state) => state.genresLoaded)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const history = useHistory()
    const handleGenre = (e) => {
        history.push('/videogames');
        dispatch(filterGenres(e.target.value));
    }
    const handleAlphabet = (e) => {
        history.push('/videogames');
        dispatch(orderAlphabet(e.target.value));
    }
    const handleRating = (e) => {
        history.push('/videogames');
        dispatch(orderRating(e.target.value));
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Link to='/videogames' >
                    <div className={styles.btn} onClick={() => window.location.reload()}>
                        <p>All videogames</p>
                    </div>
                </Link>
                <Link to='/videogames/added'>
                    <div className={styles.btn}>
                        <p>Added videogames</p>
                    </div>
                </Link>
                {/* <Link to='/genres'>
                    <div className={styles.btn}>
                        <p>Genres</p>
                    </div>
                </Link> */}
                <select onChange={(e) => handleGenre(e)}>
                    <option value='null'>Genres</option>
                    {
                        genresLoaded
                            ? genresLoaded.map((genre) => {
                                return (
                                    <option value={genre.name}>
                                        {genre.name}
                                    </option>
                                )
                            })
                            : null
                    }
                </select>
                <select onChange={(e) => handleAlphabet(e)} >
                    <option value='null'>Order by alphabet</option>
                    <option value='AZ' >A-Z</option>
                    <option value='ZA' >Z-A</option>
                </select>
                <select onChange={(e) => handleRating(e)} >
                    <option value='null'>Order by rating</option>
                    <option value='low'>Low to high</option>
                    <option value='high'>High to low</option>
                </select>
            </div>
        </div>
    )
}