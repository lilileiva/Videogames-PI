import { Link } from 'react-router-dom';
import './Searchbar.css';

export default function Searchbar() {
    return (
        <div className='searchbar'>
            <div className='search'>
                <h1>SEARCH FOR A GAME</h1>
                <form>
                    <input
                        type='text'
                        placeholder='Type here...'
                    />
                    <button>
                        search
                    </button>
                </form>
            </div>
            <div className='create'>
                <p>Or create a new one:</p>
                <Link to='/creategame'>
                    <a>CREATE</a>
                </Link>
            </div>
        </div>
    )
}