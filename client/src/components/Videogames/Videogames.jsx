import React, { useEffect, useState } from 'react';
import styles from './Videogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { connect, useSelector } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Loading from '../Helpers/Loading/Loading.jsx'


function Videogames(state, { genre }) {

    const [loading, setLoading] = useState(true)

    const loaded = useSelector((state) => state.videogamesLoaded)
    useEffect(() => {
        if (loaded.length !== 0) {
            setLoading(false);
        }
    })

    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.videogames}>
                <div className={styles.search}>
                    <Searchbar />
                </div>
                <ul className={styles.cards}>
                    {

                        loading
                            ? <Loading /> :

                            state.videogamesLoaded
                                ? state.videogamesLoaded.map((game) => (
                                    <li key={game.id} className={styles.card}>
                                        <div className={styles.imgContainer}>
                                            <img src={game.background_image} alt='videogame poster' />
                                        </div>
                                        <Link to={`/videogame/${game.id}`}>
                                            <div className={styles.titlee}>
                                                <p className={styles.title}>{game.name}</p>
                                            </div>
                                        </Link>
                                        <p>Rating: {game.rating}</p>
                                        <p>{`${genre}`}</p>
                                    </li>
                                ))
                                : null
                    }
                </ul>
            </div>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        videogamesLoaded: state.videogamesLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVideogames: dispatch(getVideogames())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Videogames);
