import { Link } from 'react-router-dom';
import spaceinvaders from '../../img/spaceinvaders.png'
import './Navbar.css';

export default function Navbar() {
    return (
        <nav>
            <div className='nav-container'>
                    <Link to='/'>
                        <h1 className='title'>
                            VIDEO
                            <br/>
                            GAMES
                        </h1>
                    </Link>
                <div className='buttons'>
                    <div className='btn'>
                        <Link to='/'>
                            <img src={spaceinvaders} alt="image" />
                            <a>Home</a>
                        </Link>
                    </div>
                    <div className='btn'>
                        <Link to='/creategame'>
                            <img src={spaceinvaders} alt="image" />
                            <a>Create videogame</a>
                        </Link>
                    </div>
                    <div className='btn'>
                        <Link to='/about'>
                            <img src={spaceinvaders} alt="image" />
                            <a>About</a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}