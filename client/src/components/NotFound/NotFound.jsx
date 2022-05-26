import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.notfound}>
                <h2>ERROR 404 :(</h2>
                <h2>(NOT FOUND)</h2>
                <Link to='/home'>
                    <button className={styles.btn}>GO TO HOME</button>
                </Link>
            </div>
        </div>
    )
};

export default NotFound;