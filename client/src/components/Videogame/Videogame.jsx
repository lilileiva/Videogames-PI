import React from 'react';
import styles from './Videogame.module.css';
import { useDispatch } from 'react-redux';
import { createVideogame } from '../../redux/actions';


export default function Videogame() {

    const dispatch = useDispatch();
    const [input, setInput] = React.useState({
       name:"",
       description: "",
       platforms: "",
       released: "",
       img: ""
    });
 
   const handleInputChange = (e) => {
     setInput({
       ...input,
       [e.target.name]: e.target.value
    });
   }
 
   const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createVideogame(input))
  }

    return (
        <div className={styles.container}>
            <div className={styles.createVideogame}>
                <h2>Create videogame</h2>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder='Name*'
                        className={styles.inputs} 
                        name='name'
                        value={input.name}
                        onChange={e => handleInputChange(e)}
                    />
                    <textarea
                        type="text"
                        placeholder='Description*'
                        className={styles.inputs}
                        name='description'
                        value={input.description}
                        onChange={e => handleInputChange(e)}
                    />
                    <input
                        type="text"
                        placeholder='Platforms*'
                        className={styles.inputs}
                        name='platforms'
                        value={input.platforms}
                        onChange={e => handleInputChange(e)}
                    />
                    <input
                        type="text"
                        placeholder='Genres'
                        className={styles.inputs}
                        name='genres'
                        value={input.genres}
                        onChange={e => handleInputChange(e)}
                    />
                    <input
                        type="date"
                        placeholder='Released date'
                        className={styles.inputs}
                        name='released'
                        value={input.released}
                        onChange={e => handleInputChange(e)}
                    />
                    <label for="img">Select image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        className={styles.inputs}
                        id='img'
                        name='img'
                        value={input.img}
                        onChange={e => handleInputChange(e)}
                    />
                    <input type="submit" value='Create' className={styles.btn} />
                </form>
            </div>
        </div>
    )
}