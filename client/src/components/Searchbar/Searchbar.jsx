import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
import loupe from '../../img/loupe.png'


function Searchbar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    const history = useHistory();

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getVideogames(input))
        setInput("")
        history.push(`/videogames?name=${input}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        type='text'
                        placeholder='search here...'
                        autoComplete='off'
                        name='input'
                        value={input}
                        onChange={e => handleInputChange(e)}
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


function mapStateToProps(state) {
    return {
        videogamesLoaded: state.videogamesLoaded,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getVideogames: dispatch(getVideogames())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Searchbar);