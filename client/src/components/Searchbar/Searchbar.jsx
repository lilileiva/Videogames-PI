import { Link } from 'react-router-dom';
import './Searchbar.css';

export default function Searchbar() {
    return (
        <div className='search-container'>
            <div className='searchbar'>
                <h1>SEARCH FOR A GAME</h1>
                <form>
                    <input
                        type='text'
                        placeholder='Type here...'
                    />
                    <button className='btn-searchbar'>
                        search
                    </button>
                </form>
            </div>
            <div className='creategame'>
                <p>Or create a new one:</p>
                <Link to='/creategame'>
                    <a className='a-creategame'>CREATE</a>
                </Link>
            </div>
        </div>
    )
}