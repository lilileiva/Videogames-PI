import { Link } from 'react-router-dom';
import styles from './Searchbar.module.css';

export default function Searchbar() {
    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <form>
                    <input
                        type='text'
                        placeholder='Type here...'
                    />
                    <button className={styles.btn}>
                        search
                    </button>
                </form>
            </div>
        </div>

    )
}