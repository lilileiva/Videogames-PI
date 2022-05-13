import React from "react";
import styles from './Loading.module.css'

export default function LoadingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.loader}></div>
        </div>
    )
}
