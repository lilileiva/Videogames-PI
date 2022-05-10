import { Link, NavLink } from 'react-router-dom';
import spaceinvaders from '../../img/spaceinvaders.png'
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav>
            <div className={styles.container}>
                    <Link to='/videogames'>
                        <h1 className={styles.title}>
                            VIDEO
                            <br/>
                            GAMES
                        </h1>
                    </Link>
                <div className={styles.buttons}>
                    <div className={styles.btn}>
                        <NavLink to='/videogames'>
                            <img src={spaceinvaders} alt="image" />
                            Home
                        </NavLink>
                    </div>
                    <div className={styles.btn}>
                        <NavLink to='/about'>
                            <img src={spaceinvaders} alt="image" />
                            About
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}