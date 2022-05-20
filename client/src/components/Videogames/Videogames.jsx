import React, { useEffect, useState } from 'react';
import styles from './Videogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getVideogamesByName, getVideogameById } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Helpers/Loading/Loading.jsx';
import Pagination from '../Helpers/Pagination/Pagination.jsx';


function Videogames() {
    const dispatch = useDispatch();
    const { name } = useParams();
    /*---------------------------*/
    const videogamesByNameLoaded = useSelector((state) => state.videogamesByNameLoaded)
    useEffect(() => {
        if (name) {
            if (videogamesByNameLoaded) {
                dispatch(getVideogamesByName(name))
            }
        }
    }, [dispatch, name, videogamesByNameLoaded]);
    /*---------------------------*/
    const videogamesLoaded = useSelector((state) => state.videogamesLoaded)
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch]);
    /*---------------------------*/
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (videogamesLoaded.length !== 0) {
            setLoading(false);
        }
    }, [videogamesLoaded.length]);
    /*---------------------------*/
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = videogamesLoaded.slice(indexOfFirstGame, indexOfLastGame);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    /*---------------------------*/
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar setCurrentPage={setCurrentPage} />
            </div>
            <div className={styles.videogames}>
                <div className={styles.search}>
                    <Searchbar />
                </div>
                <ul className={styles.cards}>
                    {
                        loading
                            ? <Loading />
                            : currentGames.length !== 0
                                ? currentGames.map((game) => (
                                    <Link to={`/videogames/${game.id}`}>
                                        <li key={game.id} className={styles.card} onClick={() => dispatch(getVideogameById(`${game.id}`))}>
                                            <img className={styles.image} src={game.img} alt='videogame poster' />
                                            <div className={styles.text}>
                                                <p className={styles.title}>{game.name}</p>
                                                <div className={styles.description}>
                                                    <span>{game.genres}</span>
                                                    <span className={styles.rating}>{game.rating}</span>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                ))
                                : <span>No results...</span>
                    }
                </ul>
                    <Pagination currentGames={currentGames} gamesPerPage={gamesPerPage} paginate={paginate} />
            </div>
        </div>
    )
};

export default Videogames;
