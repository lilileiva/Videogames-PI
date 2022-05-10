import styles from './Videogame.module.css';
import Sidebar from '../Sidebar/Sidebar.jsx';


export default function Videogame() {
    return (
        <div className={styles.container}>
            <h2>Create videogame</h2>
            <div className={styles.sidebar_form}>
                <Sidebar />
                <div className={styles.inputs}>
                    <form>
                        <input type="text" placeholder='Name*' />
                        <input type="text" placeholder='Description*' />
                        <input type="text" placeholder='Platform*' />
                        <input type="text" placeholder='Genres' />
                        <input type="text" placeholder='Released date' />
                        <input type="submit" value='Create' className={styles.btn} />
                    </form>
                </div>
            </div>
        </div>
    )
}