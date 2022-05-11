import React from 'react';
import styles from './Searchbar.module.css';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions';


export default function Searchbar() {

    const dispatch = useDispatch();
    const [input, setInput] = React.useState({
       name:"",
    });
 
   const handleInputChange = (e) => {
     setInput({
       ...input,
       [e.target.name]: e.target.value
    });
   }
 
   const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getVideogames(input))
  }

    return (
        <div className={styles.container}>
            <div className={styles.searchbar}>
                <form onSubmit={e => handleSubmit(e)}>
                    <input
                        type='text'
                        placeholder='Type here...'
                        name='name'
                        value={input.name}
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