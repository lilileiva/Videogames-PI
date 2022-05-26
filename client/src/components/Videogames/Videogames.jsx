import React from 'react';
import styles from './Videogames.module.css';
import { useDispatch } from 'react-redux';
import { getVideogameById } from '../../redux/actions';
import { Link } from 'react-router-dom';
import joystick from '../../img/joystick.jpg'


function Videogames({ currentGames }) {
    const dispatch = useDispatch();

    return (
        <ul className={styles.cards}>
            {
                currentGames.length >= 1
                    ? currentGames.map((game) => (
                        <Link to={`/videogame/${game.id}`}>
                            <li key={game.id} className={styles.card} onClick={() => dispatch(getVideogameById(`${game.id}`))}>
                                {game.img ? <img className={styles.image} src={game.img} alt='videogame poster' /> : <img className={styles.image} src={joystick} alt='videogame poster' />}
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
                    : currentGames.length === 0
                        ? <span>No results...</span> : null
            }
        </ul>
    )
};

export default Videogames;

