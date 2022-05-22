import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterGenres, orderAlphabet, orderRating, addedVideogames, getVideogames } from '../../redux/actions';
import { useHistory } from 'react-router-dom';


export default function Sidebar({setCurrentPage}) {
    const dispatch = useDispatch();

    const genresLoaded = useSelector((state) => state.genresLoaded)

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (genresLoaded.length !== 0) {
            setLoading(false);
        }
    }, [genresLoaded.length]);

    const history = useHistory()
    const handleAllVideogames = () => {
        history.push('/videogames');
        window.location.reload()
    }
    const handleAddedVideogames = () => {
        history.push('/videogames/added');
        dispatch(addedVideogames());
        setCurrentPage(1);
    }
    const handleGenre = (e) => {
        history.push('/videogames');
        dispatch(filterGenres(e.target.value));
        setCurrentPage(1);
    }
    const handleAlphabet = (e) => {
        history.push('/videogames');
        dispatch(orderAlphabet(e.target.value));
        setCurrentPage(1);
    }
    const handleRating = (e) => {
        history.push('/videogames');
        dispatch(orderRating(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Link to='/videogames' >
                    <div className={styles.btn} onClick={() => handleAllVideogames()}>
                        <p>All videogames</p>
                    </div>
                </Link>
                <div className={styles.btn} onClick={() => handleAddedVideogames()} >
                    <p>Added videogames</p>
                </div>
                <select onChange={(e) => handleGenre(e)}>
                    <option value='null'>Genres</option>
                    {
                        !loading
                            ? genresLoaded.map((genre) => {
                                return (
                                    <option key={genre.id} value={genre.name}>
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
                    <option value='high'>High to low</option>
                    <option value='low'>Low to high</option>
                </select>
            </div>
        </div>
    )
}