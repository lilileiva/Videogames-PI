import { Link, NavLink } from 'react-router-dom';
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
                        <NavLink exact to='/'>
                            <img src={spaceinvaders} alt="image" />
                            Home
                        </NavLink>
                    </div>
                    <div className='btn'>
                        <NavLink to='/creategame'>
                            <img src={spaceinvaders} alt="image" />
                            Create videogame
                        </NavLink>
                    </div>
                    <div className='btn'>
                        <NavLink to='/about'>
                            <img src={spaceinvaders} alt="image" />
                            About
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}