import React from 'react';
import styles from './Genres.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { connect } from 'react-redux';
import { getGenres } from '../../redux/actions';


function Genres(state) {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.genres}>
                <h2>Genres</h2>
                 <ul>
                    {
                        state.videogamesLoaded
                            ? state.videogamesLoaded.map((game) => (
                                <li>
                                    <p>{game.name}</p>
                                    <p>{game.released}</p>
                                    <img src={game.img} alt='videogame poster' />
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
        genresLoaded: state.genresLoaded
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getGenres: dispatch(getGenres())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Genres);