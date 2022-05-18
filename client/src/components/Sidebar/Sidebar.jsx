import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterGenres, orderAlphabet, orderRating } from '../../redux/actions';
import { useHistory } from 'react-router-dom';


export default function Sidebar() {
    const dispatch = useDispatch();

    const genresLoaded = useSelector((state) => state.genresLoaded)

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const handleGenre = (e) => {
        dispatch(filterGenres(e.target.value))
    }
    const handleAlphabet = (e) => {
        dispatch(orderAlphabet(e.target.value))
    }
    const handleRating = (e) => {
        dispatch(orderRating(e.target.value))
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
                <select onChange={handleGenre}>
                    <option value='null'>Genres</option>
                    {
                        genresLoaded
                            ? genresLoaded.map((genre) => {
                                return (
                                    // <Link to='/genres'>
                                    <option name={genre.name} value={genre.name}>
                                        {genre.name}
                                    </option>
                                    //</Link>
                                )
                            })
                            : null
                    }
                </select>
                <select onChange={handleAlphabet} >
                    <option value='null'>Order by alphabet</option>
                    <option value='A' >A-Z</option>
                    <option value='Z' >Z-A</option>
                </select>
                {/* <button onClick={() => dispatch(orderAlphabet('Z-A'))}>Z-A</button>
                <button onClick={() => dispatch(orderAlphabet('A-Z'))}>A-Z</button> */}
                <select onChange={(e) => handleRating(e)} >
                    <option value='null'>Order by rating</option>
                    <option value='low'>Low to high</option>
                    <option value='high'>High to low</option>
                </select>
                {/* <button onClick={(e) => dispatch(orderRating(e, 'Low to high'))}>Low to high</button>
                <button onClick={(e) => dispatch(orderRating(e, 'High to low'))}>High to low</button> */}
            </div>
        </div>
    )
}