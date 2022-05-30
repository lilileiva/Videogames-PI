import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { allVideogames, filterGenres, orderAlphabet, orderRating, addedVideogames, getGenres, reset, getVideogamesLoaded } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';


export default function Sidebar({ setCurrentPage }) {
    const dispatch = useDispatch();

    const allVideogamesLoaded = useSelector((state) => state.allVideogames)

    const genresLoaded = useSelector((state) => state.genresLoaded)
    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    const navigate = useNavigate()
    const handleAllVideogames = () => {
        navigate('/home');
        dispatch(reset());
        if (allVideogamesLoaded.length === 0) {
            dispatch(getVideogamesLoaded())
        } else {
            dispatch(allVideogames())
        }
        setCurrentPage(1);
    }
    const handleAddedVideogames = () => {
        navigate('/home');
        dispatch(reset());
        dispatch(addedVideogames());
        setCurrentPage(1);
    }
    const handleGenre = (e) => {
        navigate('/home');
        dispatch(reset());
        dispatch(filterGenres(e.target.value));
        setCurrentPage(1);
    }
    const handleAlphabet = (e) => {
        navigate('/home');
        dispatch(orderAlphabet(e.target.value));
        setCurrentPage(1);
    }
    const handleRating = (e) => {
        navigate('/home');
        dispatch(orderRating(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Link to='/home' >
                    <div className={styles.btn} onClick={() => handleAllVideogames()}>
                        <p>All games</p>
                    </div>
                </Link>
                <div className={styles.btn} onClick={() => handleAddedVideogames()} >
                    <p>Added games</p>
                </div>
                <select onChange={(e) => handleGenre(e)}>
                    <option value='null'>Genres</option>
                    {
                        genresLoaded.length === 0 || allVideogamesLoaded.length === 0
                            ? <option value='null'>Cargando...</option>
                            : genresLoaded.length >= 1
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