import styles from './Videogame.module.css';


export default function Videogame() {
    return (
        <div className={styles.container}>
            <div className={styles.createVideogame}>
                <h2>Create videogame</h2>
                <form>
                    <input type="text" placeholder='Name*' className={styles.inputs} />
                    <textarea type="text" placeholder='Description*' className={styles.inputs} />
                    <input type="text" placeholder='Platforms*' className={styles.inputs} />
                    <input type="text" placeholder='Genres' className={styles.inputs} />
                    <input type="text" placeholder='Released date' className={styles.inputs} />
                    <input type="submit" value='Create' className={styles.btn} />
                </form>
            </div>
        </div>
    )
}