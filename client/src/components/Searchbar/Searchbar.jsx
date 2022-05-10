import { Link } from 'react-router-dom';
import './Searchbar.css';

export default function Searchbar() {
    return (
        <div className='sb-container'>
            <div className='searchbar'>
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
        </div>

    )
}