import { NavLink } from 'react-router-dom';
import spaceinvaders from '../../img/spaceinvaders.png'
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={styles.container}>
            <div className='buttons'>
                <div className={styles.btn}>
                    <NavLink to='/videogames'>
                        <a>Videoagames</a>
                        <img src={spaceinvaders} alt="image" />
                    </NavLink>
                </div>
                <div className={styles.btn}>
                    <NavLink to='/genres'>
                        <a>Genres</a>
                        <img src={spaceinvaders} alt="image" />
                    </NavLink>
                </div>
                <div className={styles.btn}>
                    <NavLink to='/videogame'>
                        <a>Create videoagame</a>
                        <img src={spaceinvaders} alt="image" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}