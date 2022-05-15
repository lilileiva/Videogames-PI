import React, { useEffect } from 'react';
import styles from './GameDetail.module.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getVideogameById } from '../../redux/actions';
import { useParams } from "react-router-dom";


export default function GameDetail(state) {
    const { id } = useParams();

    const dispatch = useDispatch();

    const videogameDetail = useSelector((state) => state.videogameDetail)

    // useEffect(()=>{
    //     dispatch(getVideogameById(id));
    // },[])
    useEffect(() => {
        dispatch(getVideogameById(id));
    }, [dispatch, id])

    return (
        <div className={styles.container}>
            <div className={styles.gameDetail}>
                <ul>
                    {/* {
                        state.videogameDetail
                            ? state.videogameDetail.map((game) => (
                                <li>
                                    <p>{game.name}</p>
                                    <p>{game.released}</p>
                                    <img src={game.img} alt='videogame poster' />
                                </li>
                            ))
                            : null
                    } */}
                    {
                        videogameDetail
                            ? (
                                <div className={styles.card}>
                                    <h2>{videogameDetail.name}</h2>
                                    <img src={videogameDetail.img} />
                                    <p>{videogameDetail.description}</p>
                                    <p>{videogameDetail.genres}</p>
                                    <p>{videogameDetail.platforms}</p>
                                </div>
                            )
                            : null
                    }
                </ul>
            </div>
        </div>
    )
}


// function mapStateToProps(state) {
//     return {
//         videogameDetail: state.videogameDetail
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getVideogameById: id => dispatch(getVideogameById(id))
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(GameDetail);
