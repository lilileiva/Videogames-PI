import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { useDispatch } from 'react-redux';
import {  searchName, reset, getVideogamesByName } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import loupe from '../../img/loupe.png';


function Searchbar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    const handleChange = (e) => {
        setName(e.target.value)
    }

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/home')
        dispatch(reset())
        dispatch(searchName(name))
        dispatch(getVideogamesByName(name))
        setName("")
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
                        <img src={loupe} alt='loupe' />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Searchbar;