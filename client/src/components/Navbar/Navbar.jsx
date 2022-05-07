import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
    return (
        <nav>
            <div className='nav'>
                    <Link to='/'>
                        <h1>VIDEO</h1>
                        <h1>GAMES</h1>
                    </Link>
                <div className='btn'>
                    <Link to='/'>
                        <a>Home</a>
                    </Link>
                    <Link to='/creategame'>
                        <a>Create videogame</a>
                    </Link>
                    <Link to='/about'>
                        <a>About</a>
                    </Link>
                </div>
            </div>
        </nav>
    )
}