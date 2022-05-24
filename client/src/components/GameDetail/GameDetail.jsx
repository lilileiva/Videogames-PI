import React, { useEffect } from 'react';
import styles from './GameDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById } from '../../redux/actions';
import { Link, useParams } from "react-router-dom";
import joystick from '../../img/joystick.jpg';


export default function GameDetail() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const videogameDetail = useSelector((state) => state.videogameDetail)

    useEffect(() => {
        dispatch(getVideogameById(id));
    }, [dispatch, id])

    return (
        <div className={styles.container}>
            <Link to='/videogames'>
                <span>← Return</span>
            </Link>
            <div className={styles.gameDetail}>
                {
                    videogameDetail
                        ? (
                            <div className={styles.card}>
                                <div className={styles.row}>
                                    {videogameDetail.img
                                        ? <img src={videogameDetail.img} alt='videogame' />
                                        : <img src={joystick} alt='videogame' />}
                                    <div className={styles.details}>
                                        <h2>{videogameDetail.name}</h2>
                                        <p>{videogameDetail.description}</p>
                                        {videogameDetail.released
                                            ? <p>Released: {videogameDetail.released}</p>
                                            : <p>Released: ...</p>}
                                        {videogameDetail.genres
                                            ? <p>Genres: {videogameDetail.genres}</p>
                                            : <p>Genres: ...</p>}
                                        {videogameDetail.rating
                                            ? <p>Rating: {videogameDetail.rating}</p>
                                            : <p>Rating: ...</p>}
                                        {videogameDetail.platforms
                                            ? <p>Platforms: {videogameDetail.platforms}</p>
                                            : <p>Platforms: ...</p>}

                                    </div>
                                </div>
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    )
}