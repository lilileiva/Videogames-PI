import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, reset, getVideogamesLoaded } from '../../redux/actions';
import Loading from '../Helpers/Loading/Loading.jsx';
import Pagination from '../Helpers/Pagination/Pagination.jsx';
import Videogames from '../Videogames/Videogames.jsx';


function Home() {
    const dispatch = useDispatch()

    const searchName = useSelector((state) => state.searchName)
    const allVideogames = useSelector((state) => state.allVideogames)
    const videogamesLoaded = useSelector((state) => state.videogamesLoaded)
    useEffect(() => {
        if (allVideogames.length === 0 && searchName.length === 0) {
            dispatch(reset())        
            dispatch(getVideogamesLoaded())
        }
        if (allVideogames.length === 0) {
            dispatch(getVideogames())
        }
    }, [dispatch, allVideogames.length]);

    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage, setGamesPerPage] = useState(15);
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    let currentGames;
    currentGames = videogamesLoaded.length >= 1
        ? videogamesLoaded.slice(indexOfFirstGame, indexOfLastGame)
        : videogamesLoaded
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar setCurrentPage={setCurrentPage} currentGames={currentGames} />
            </div>
            <div className={styles.videogames}>
                <div className={styles.search}>
                    <Searchbar />
                </div>
                <div className={styles.cards}>
                    {
                        currentGames.length >= 1
                            ? <Videogames currentGames={currentGames} />
                            : currentGames.length === 0
                                ? <Loading />
                                : <p className={styles.tryAgain}>Try again...</p>
                    }
                </div>
                <Pagination gamesPerPage={gamesPerPage} paginate={paginate} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div >
    )
};

export default Home;
