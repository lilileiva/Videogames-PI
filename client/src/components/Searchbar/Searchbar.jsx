import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import { connect } from "react-redux";

import { useHistory } from 'react-router-dom';


export default function Searchbar() {
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
    history.push('/videogames')
  }

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        type='text'
                        placeholder='Type here...'
                        autoComplete='off'
                        name='input'
                        value={input}
                        onChange={e => handleInputChange(e)}
                    />
                    <button type='submit' className={styles.btn}>
                        search
                    </button>
                </form>
            </div>
        </div>

    )
}