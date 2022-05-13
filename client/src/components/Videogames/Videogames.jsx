import React from 'react';
import styles from './Videogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { connect } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import { Link } from 'react-router-dom';


function Videogames(state) {
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
                        state.videogamesLoaded
                            ? state.videogamesLoaded.map((game) => (
                                <li className={styles.card}>
                                    <div className={styles.imgContainer}>
                                        <img src={game.background_image} alt='videogame poster' />
                                    </div>
                                    <Link to={`/videogame/${game.id}`}>
                                        <p className={styles.title}>{game.name}</p>
                                    </Link>
                                    <p>{game.released}</p>
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
