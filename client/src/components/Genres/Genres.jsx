import styles from './Genres.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';


export default function Genres() {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.genres}>
                <h2>Genres</h2>
            </div>
        </div>
    )
}