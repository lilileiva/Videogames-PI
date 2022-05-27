import React, { useEffect, useState } from 'react';
import styles from './GameDetail.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogameById, reset } from '../../redux/actions';
import { Link, useParams } from "react-router-dom";
import joystick from '../../img/joystick.jpg';
import Loading from '../Helpers/Loading/Loading.jsx'


export default function GameDetail() {
    const { id } = useParams();

    const dispatch = useDispatch();

    const videogameDetail = useSelector((state) => state.videogameDetail)


    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     if (videogameDetail) {
    //         setLoading(false);
    //     }
    // }, [videogameDetail]);


    useEffect(() => {
        dispatch(getVideogameById(id));
        return console.log('hola')
    }, [dispatch, id])

    return (
        <div className={styles.container}>
            <Link to='/home'>
                <span>← Return</span>
            </Link>
            <div className={styles.gameDetail}>
                {
                    // videogameDetail
                    //     ? 
                    (!videogameDetail.platforms && !videogameDetail.rating && !videogameDetail.released && !videogameDetail.description && !videogameDetail.img)
                        ? <Loading />
                        : (
                            <div className={styles.card}>
                                <div className={styles.row}>
                                    {videogameDetail.img
                                        ? <img src={videogameDetail.img} alt='videogame' />
                                        : <img src={joystick} alt='videogame' />}
                                    <div>
                                        <h2>{videogameDetail.name}</h2>
                                        {
                                            videogameDetail.description
                                                ? <p>{videogameDetail.description}</p>
                                                : <p>Description: ...</p>
                                        }
                                        <div className={styles.details}>
                                            {
                                                videogameDetail.released
                                                    ? <p>Released: {videogameDetail.released}</p>
                                                    : <p>Released: ...</p>
                                            }
                                            {
                                                videogameDetail.genres
                                                    ? <p>Genres: {videogameDetail.genres}</p>
                                                    : <p>Genres: ...</p>
                                            }
                                            {
                                                videogameDetail.rating
                                                    ? <p>Rating: {videogameDetail.rating}</p>
                                                    : <p>Rating: ...</p>
                                            }
                                            {
                                                videogameDetail.platforms
                                                    ? <p>Platforms: {videogameDetail.platforms}</p>
                                                    : <p>Platforms: ...</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
 
                }
                {/* {
                    (!videogameDetail.platforms && !videogameDetail.rating && !videogameDetail.released && !videogameDetail.description && !videogameDetail.img)
                        ? <Loading />
                        : null
                } */}

            </div>
        </div>
    )
}