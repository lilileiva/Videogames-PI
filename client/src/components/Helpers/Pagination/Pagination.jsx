import React from "react";
import styles from './Pagination.module.css';
import { useSelector } from "react-redux";


function Pagination({gamesPerPage, paginate}) {
    const pageNumbers = [];

    const videogamesLoaded = useSelector((state) => state.videogamesLoaded);

    for (let i = 1; i < Math.ceil(videogamesLoaded.length / gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.container}>
            <ul className={styles.pages}>
                {
                    pageNumbers.map((number) => (
                        <li key={number} >
                            <p onClick={() => paginate(number)} className={styles.pageNumber} >
                                {number}
                            </p>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pagination;