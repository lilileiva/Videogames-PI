import { Link, NavLink } from 'react-router-dom';
import spaceinvaders from '../../img/spaceinvaders.png'
import styles from './Navbar.module.css';


export default function Navbar() {
    let activeStyle = {
        color: 'yellow'
      };

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
                        <NavLink exact to='/videogames' style={({ isActive }) => isActive ? activeStyle : null} >
                            <img src={spaceinvaders} alt="spaceinvaders img" />
                            HOME
                        </NavLink>
                    </div>
                    <div className={styles.btn}>
                        <NavLink to='/videogame' style={({ isActive }) => isActive ? activeStyle : null}>
                            <img src={spaceinvaders} alt="spaceinvaders img" />
                            CREATE GAME
                        </NavLink>
                    </div>
                    <div className={styles.btn}>
                        <NavLink to='/about' style={({ isActive }) => isActive ? activeStyle : null}>
                            <img src={spaceinvaders} alt="spaceinvaders img" />
                            ABOUT
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}
//activeStyle={{color: 'yellow'}}