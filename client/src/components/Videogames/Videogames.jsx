import React from 'react';
import styles from './Videogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';
import { connect } from 'react-redux';
import { getVideogames } from '../../redux/actions';


function Videogames(state) {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.videogames}>
                {/* <h2>Videogames</h2> */}
                <div className={styles.search}>
                    <Searchbar />
                </div>

                <ul>
                    {
                        state.videogamesLoaded
                            ? state.videogamesLoaded.map((game) => (
                                <li>
                                    <p>{game.name}</p>
                                    <p>{game.released}</p>
                                    <img src={game.background_image} alt='videogame poster' />
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
