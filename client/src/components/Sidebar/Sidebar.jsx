import { NavLink } from 'react-router-dom';
import spaceinvaders from '../../img/spaceinvaders.png'
import './Sidebar.css';

export default function Sidebar() {
    return (
        <div className='sidebar-container'>
            <div className='buttons-sidebar'>
                <div className='btn-sidebar'>
                    <NavLink to='/videogames'>
                        <a>Videoagames</a>
                        <img src={spaceinvaders} alt="image" />
                    </NavLink>
                </div>
                <div className='btn-sidebar'>
                    <NavLink to='/genres'>
                        <a>Genres</a>
                        <img src={spaceinvaders} alt="image" />
                    </NavLink>
                </div>
                <div className='btn-sidebar'>
                    <NavLink to='/videogame'>
                        <a>Create videoagame</a>
                        <img src={spaceinvaders} alt="image" />
                    </NavLink>
                </div>
            </div>
        </div>
    )
}