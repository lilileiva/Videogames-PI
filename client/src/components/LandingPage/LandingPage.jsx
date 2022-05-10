import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Searchbar from '../Searchbar/Searchbar.jsx';

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <h1>SEARCH FOR A GAME</h1>
                <Searchbar />
            </div>
            <div className={styles.home}>
                <p>Entry to our home:</p>
                <Link to='/videogames'>
                    <a className={styles.btn}>HOME</a>
                </Link>
            </div>
        </div>
    )
}