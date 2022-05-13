import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <div className={styles.container}>
            <div className={styles.buttons}>
                <Link to='/videogames' >
                    <div className={styles.btn}>
                        <p>All videogames</p>
                    </div>
                </Link>
                <Link to='/videogames' >
                    <div className={styles.btn}>
                        <p>Added videogames</p>
                    </div>
                </Link>
                <Link to='/genres' >
                    <div className={styles.btn}>
                        <p>Genres</p>
                    </div>
                </Link>
                <select>
                    <option value='null'>Order by alphabet</option>
                    <option>A-Z</option>
                    <option>Z-A</option>
                </select>
                <select>
                    <option value='null'>Order by rating</option>
                    <option>Low to high</option>
                    <option>High to low</option>
                </select>
            </div>
        </div>
    )
}