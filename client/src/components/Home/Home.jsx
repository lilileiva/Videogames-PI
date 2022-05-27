import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, reset } from '../../redux/actions';
import Loading from '../Helpers/Loading/Loading.jsx';
import Pagination from '../Helpers/Pagination/Pagination.jsx';
import Videogames from '../Videogames/Videogames.jsx';


function Home() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset())
    }, [dispatch])

    let videogamesLoaded = useSelector((state) => state.videogamesLoaded)
    useEffect(() => {
        if (videogamesLoaded.length === 0) {
            dispatch(getVideogames())
        }
    }, [dispatch, videogamesLoaded.length]);

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (videogamesLoaded.length >= 1) {
            setLoading(false);
        }
    }, [videogamesLoaded.length]);

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    let currentGames;

    if (!loading) {
        currentGames = videogamesLoaded.length >= 1 ? videogamesLoaded.slice(indexOfFirstGame, indexOfLastGame) : videogamesLoaded
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar setCurrentPage={setCurrentPage} currentGames={currentGames} />
            </div>
            <div className={styles.videogames}>
                <div className={styles.search}>
                    <Searchbar/>
                </div>
                <div className={styles.cards}>
                    {
                        loading
                            ? <Loading />
                            : <Videogames currentGames={currentGames} /> 
                    }
                </div>
                <Pagination gamesPerPage={gamesPerPage} paginate={paginate} />
            </div>
        </div >
    )
};

export default Home;
