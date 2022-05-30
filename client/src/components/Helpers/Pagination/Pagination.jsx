import React from "react";
import styles from './Pagination.module.css';
import { useSelector } from "react-redux";



function Pagination({ gamesPerPage, paginate, setCurrentPage, currentPage }) {
    const pageNumbers = [];

    const videogamesLoaded = useSelector((state) => state.videogamesLoaded);

    for (let i = 1; i < Math.ceil(videogamesLoaded.length / gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.container}>
            {
                videogamesLoaded.length === 0
                    ? null
                    : <ul className={styles.pages}>
                        <p onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)}>
                            Back
                        </p>
                        {
                            pageNumbers.map((number) => (
                                <li key={number} >
                                    <p onClick={() => paginate(number)} className={styles.pageNumber} >
                                        {number}
                                    </p>
                                </li>
                            ))
                        }
                        <p onClick={() => setCurrentPage(currentPage < pageNumbers.length ? currentPage + 1 : currentPage)}>
                            Next
                        </p>
                    </ul>
            }

        </div>
    )
}

export default Pagination;