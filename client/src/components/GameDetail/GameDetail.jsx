import React from 'react';
import styles from './GameDetail.module.css';
import { connect } from 'react-redux';
import { getVideogameById } from '../../redux/actions';


function GameDetail(state) {
    return (
        <div className={styles.container}>
            <div className={styles.gameDetail}>
                <h2>Game Detail</h2>
                <ul>
                    {
                        state.videogameDetail
                            ? state.videogameDetail.map((game) => (
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
        videogameDetail: state.videogamesDetail
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVideogameById: dispatch(getVideogameById())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameDetail);
