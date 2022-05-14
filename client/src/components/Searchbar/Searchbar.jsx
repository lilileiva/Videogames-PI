import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { useDispatch } from 'react-redux';
import { getVideogamesByName } from '../../redux/actions';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import loupe from '../../img/loupe.png'


export default function Searchbar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const history = useHistory();

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getVideogamesByName(name))
        setName("")
        history.push(`/videogames?name=${name}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        type='text'
                        placeholder=' search here...'
                        autoComplete='off'
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        required
                    />
                    <button type='submit' className={styles.btn}>
                        <img src={loupe} />
                    </button>
                </form>
            </div>
        </div>
    )
}


// function mapStateToProps(state) {
//     return {
//         videogamesLoaded: state.videogamesLoaded,
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         getVideogamesByName: name => dispatch(getVideogamesByName(name))
//     }
// }

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Searchbar);