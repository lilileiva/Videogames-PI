import React, { useState } from 'react';
import styles from './Searchbar.module.css';
import { useDispatch } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import { connect } from "react-redux";


export default function Searchbar() {

    const dispatch = useDispatch();
    const [input, setInput] = useState({
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
                        autoComplete='off'
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

// function mapStateToProps(state) {
//     return {
//       videogamesLoaded: state.videogamesLoaded
//     };
//   };
  
//   function mapDispatchToProps(dispatch) {
//     return {
//         getVideogames: name => dispatch(getVideogames(name))
//     };
//   };
  
//   export default connect(
//     mapStateToProps,
//     mapDispatchToProps
//   )(Searchbar);