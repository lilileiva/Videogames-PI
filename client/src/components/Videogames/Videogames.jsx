import styles from './Videogames.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';
import Searchbar from '../Searchbar/Searchbar.jsx';


export default function Videogames() {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <Sidebar />
            </div>
            <div className={styles.videogames}>
                {/* <h2>Videogames</h2> */}
                <div className={styles.search}>
                    <Searchbar />
                </div>




            </div>
        </div>
    )
}