import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterGenres, orderAlphabet, orderRating, addedVideogames, getGenres } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';


export default function Sidebar({ setCurrentPage }) {
    const dispatch = useDispatch();

    const genresLoaded = useSelector((state) => state.genresLoaded)
       useEffect(() => {
            dispatch(getGenres())
    }, [dispatch])

    const navigate = useNavigate()
    const handleAllVideogames = () => {
        navigate('/videogames');
        window.location.reload()
        // dispatch(getVideogames())
    }
    const handleAddedVideogames = () => {
        navigate('/videogames');
        dispatch(addedVideogames());
        // setCurrentPage(1);
    }
    const handleGenre = (e) => {
        navigate('/videogames');
        dispatch(filterGenres(e.target.value));
        setCurrentPage(1);
    }
    const handleAlphabet = (e) => {
        navigate('/videogames');
        dispatch(orderAlphabet(e.target.value));
        setCurrentPage(1);
    }
    const handleRating = (e) => {
        navigate('/videogames');
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
                        genresLoaded.length === 0
                            ? <option value='null'>Cargando...</option>
                            : genresLoaded.length !== 0
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