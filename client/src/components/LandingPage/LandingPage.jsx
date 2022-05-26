import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Searchbar from '../Searchbar/Searchbar.jsx';


export default function LandingPage() {

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <h1>VIDEOGAMES INFO</h1>
                <Searchbar />
            </div>
            <div className={styles.home}>
                <p className={styles.homeText}>Entry to our home:</p>
                <Link to='/home'>
                    <button className={styles.btn}>HOME</button>
                </Link>
            </div>
            <div className={styles.square}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}