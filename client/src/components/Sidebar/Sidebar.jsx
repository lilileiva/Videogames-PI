import { Link } from 'react-router-dom';
import spaceinvaders from '../../img/spaceinvaders.png'
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={styles.container}>
            <div className='buttons'>
                <Link to='/videogames' >
                    <div className={styles.btn}>
                        <p>All videogames</p>
                        <img src={spaceinvaders} alt="spaceinvaders img" />
                    </div>
                </Link>
                <Link to='/videogames' >
                    <div className={styles.btn}>
                        <p>Added videogames</p>
                        <img src={spaceinvaders} alt="spaceinvaders img" />
                    </div>
                </Link>
                <Link to='/genres' >
                    <div className={styles.btn}>
                        <p>Genres</p>
                        <img src={spaceinvaders} alt="spaceinvaders img" />
                    </div>
                </Link>
                <div>-------------------------------------------------</div>
                <div className={styles.btn}>
                    {/* <NavLink to='/genres' activeStyle={{color: 'yellow'}} > */}
                    <p>Order by alphabet</p>
                    <img src={spaceinvaders} alt="spaceinvaders img" />
                    {/* </NavLink> */}
                </div>
                <div className={styles.btn}>
                    {/* <NavLink to='/genres' activeStyle={{color: 'yellow'}} > */}
                    <p>Order by rating</p>
                    <img src={spaceinvaders} alt="spaceinvaders img" />
                    {/* </NavLink> */}
                </div>
            </div>
        </div>
    )
}