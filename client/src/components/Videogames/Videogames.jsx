import styles from './Videogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';


export default function Videogames() {
    return (
        <div className={styles.container}>
            <h2>Videogames</h2>
            <Sidebar />
        </div>
    )
}