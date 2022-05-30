import styles from './About.module.css';

export default function About() {
    return (
        <div className={styles.container}>
            <div className={styles.about}>
                <h2>About</h2>
                <h4>Hi! I'm Liliana from Argentina.👋</h4>
                <h4>You can reach me at:</h4>
                <a target="_blank" href="http://github.com/lilileiva" className="">
                    GitHub
                </a>
                <a target="_blank" href="http://www.linkedin.com/in/lilianaleiva" className="">
                    LinkedIn
                </a>
                <p>📭 lilianadelcleiva@gmail.com</p>
            </div>
        </div>
    )
}