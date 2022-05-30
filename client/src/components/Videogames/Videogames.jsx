import React from 'react';
import styles from './Videogames.module.css';
import { Link } from 'react-router-dom';
import joystick from '../../img/joystick.jpg';


function Videogames({ currentGames }) {
    return (
        <ul className={styles.cards}>
            {
                currentGames.map((game) => (
                    <Link to={`/videogame/${game.id}`}>
                        <li key={game.id} className={styles.card}>
                            {
                                game.img
                                    ? <img className={styles.image} src={game.img} alt='videogame poster' />
                                    : <img className={styles.image} src={joystick} alt='videogame poster' />
                            }
                            <div className={styles.text}>
                                <p className={styles.title}>{game.name}</p>
                                <div className={styles.description}>
                                    <span className={styles.genres}>{game.genres}</span>
                                    <span className={styles.rating}>{game.rating}</span>
                                </div>
                            </div>
                        </li>
                    </Link>
                ))
            }
        </ul>
    )
};

export default Videogames;

