import React, { useEffect, useState } from 'react';
import styles from './AddedVideogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
// import Searchbar from '../Searchbar/Searchbar.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addedVideogames, getVideogameById } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Loading from '../Helpers/Loading/Loading.jsx'


function AddedVideogames(state) {
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const loaded = useSelector((state) => state.addedVideogamesLoaded)

    useEffect(() => {
        dispatch(addedVideogames());
        if (loaded.length !== 0) {
            setLoading(false);
        }
    }, [dispatch, loaded.length])

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.videogames}>
                <ul className={styles.cards}>
                    {
                        loading
                            ? <Loading />
                            : state.addedVideogamesLoaded
                                ? state.addedVideogamesLoaded.map((game) => (
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
                                : <span>You haven't added any videogames yet...</span>
                    }
                </ul>
            </div>
        </div>
    )
}

export default AddedVideogames;