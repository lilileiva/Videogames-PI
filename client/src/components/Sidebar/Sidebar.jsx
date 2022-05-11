import { Link } from 'react-router-dom';
import spaceinvaders from '../../img/spaceinvaders.png'
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={styles.container}>
            <div className='buttons'>
                <div className={styles.btn}>
                    <Link to='/videogames' >
                        <a>All videogames</a>
                        <img src={spaceinvaders} alt="image" />
                    </Link>
                </div>
                <div className={styles.btn}>
                    <Link to='/videogames' >
                        <a>API videogames</a>
                        <img src={spaceinvaders} alt="image" />
                    </Link>
                </div>
                <div className={styles.btn}>
                    <Link to='/videogames' >
                        <a>Added videogames</a>
                        <img src={spaceinvaders} alt="image" />
                    </Link>
                </div>
                <div className={styles.btn}>
                    <Link to='/genres' >
                        <a>Genres</a>
                        <img src={spaceinvaders} alt="image" />
                    </Link>
                </div>
                <br/>

                <div>-------------------------------------------------</div>

                <br/>
                <div className={styles.btn}>
                    {/* <NavLink to='/genres' activeStyle={{color: 'yellow'}} > */}
                        <a>Order by alphabet</a>
                        <img src={spaceinvaders} alt="image" />
                    {/* </NavLink> */}
                </div>
                <div className={styles.btn}>
                    {/* <NavLink to='/genres' activeStyle={{color: 'yellow'}} > */}
                        <a>Order by rating</a>
                        <img src={spaceinvaders} alt="image" />
                    {/* </NavLink> */}
                </div>
            </div>
        </div>
    )
}