import React, { useEffect, useState } from 'react';
import styles from './Videogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { connect, useSelector } from 'react-redux';
import { getVideogames, getVideogamesByName } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Loading from '../Helpers/Loading/Loading.jsx'


function Videogames(state) {

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
                            ? <Loading />
                            : state.videogamesLoaded
                                ? state.videogamesLoaded.map((game) => (
                                    <li key={game.id} className={styles.card}>
                                        <img className={styles.image} src={game.img} alt='videogame poster' />
                                        <div className={styles.text}>
                                            <Link to={`/videogames/${game.id}`}>
                                                <p className={styles.title}>{game.name}</p>
                                            </Link>
                                            <div className={styles.description}>
                                                {/* <span>{`${genre}`}</span> */}
                                                <span className={styles.rating}>{game.rating}</span>
                                            </div>
                                        </div>
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
        videogamesLoaded: state.videogamesLoaded,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVideogames: dispatch(getVideogames()),
        getVideogamesByName: name => dispatch(getVideogamesByName(name))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Videogames);
