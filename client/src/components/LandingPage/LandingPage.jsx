import { Link } from 'react-router-dom';
import './LandingPage.css';
import Searchbar from '../Searchbar/Searchbar.jsx';

export default function LandingPage() {
    return (
        <div className='lp-container'>
            <div className='searchbar'>
                <h1>SEARCH FOR A GAME</h1>
                <Searchbar />
            </div>
            <div className='home'>
                <p>Entry to our home:</p>
                <Link to='/videogames'>
                    <a className='a-home'>HOME</a>
                </Link>
            </div>
        </div>
    )
}