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
                <select>
                    <option value='null'>Genres</option>
                    <option>Action</option>
                    <option>Terror</option>
                    <option>Fantasy</option>
                </select>
                <ul>
                    {
                        state.genresLoaded
                            ? state.genresLoaded.map((game) => (
                                <li>
                                    <p>{game.name}</p>
                                    <p>{game.released}</p>
                                    <img src={game.img} alt='videogame poster' />
                                </li>
                            ))
                            : <p>No genres...</p>
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