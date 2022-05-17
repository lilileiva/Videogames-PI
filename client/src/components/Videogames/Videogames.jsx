import React, { useEffect, useState } from 'react';
import styles from './Videogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getVideogames, getVideogamesByName, getVideogameById } from '../../redux/actions';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Helpers/Loading/Loading.jsx'


function Videogames() {
    const dispatch = useDispatch()

    const { name } = useParams();

    const videogamesByName = useSelector((state) => state.videogamesByNameLoaded)
    useEffect(() => {
        if (name) {
            if (videogamesByName.length !== 0) {
                dispatch(getVideogamesByName(name))
            }
        }
    }, [dispatch, name])

    const videogames = useSelector((state) => state.videogamesLoaded)
    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (videogames.length !== 0) {
            setLoading(false);
        }
    }, [videogames.length])

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
                            : videogamesByName.length !== 0
                                ? videogamesByName.map((game) => (
                                    <li key={game.id} className={styles.card}>
                                        {
                                            game.img
                                                ? <img className={styles.image} src={game.img} alt='videogame poster' />
                                                : <img className={styles.image} src='https://wallpaperaccess.com/full/2389962.jpg' alt='videogame poster' />
                                        }
                                        <div className={styles.text}>
                                            <Link to={`/videogames/${game.id}`}>
                                                <p className={styles.title}>{game.name}</p>
                                            </Link>
                                            <div className={styles.description}>
                                                <span>{game.genres}</span>
                                                <span className={styles.rating}>{game.rating}</span>
                                            </div>
                                        </div>
                                    </li>
                                ))
                                : videogames.length !== 0
                                    ? videogames.map((game) => (
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
            </div>
        </div>
    )
}

export default Videogames;

// function mapStateToProps(state) {
//     return {
//         videogamesLoaded: state.videogamesLoaded,
//         videogamesByNameLoaded: state.videogamesByNameLoaded,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getVideogames: dispatch(getVideogames()),
//         getVideogamesByName: name => dispatch(getVideogamesByName(name))
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Videogames);
