import './Videogame.css';
import Sidebar from '../Sidebar/Sidebar.jsx';


export default function Videogame() {
    return (
        <div className='videogame-container'>
            <h2>Create videogame</h2>
            <div className='sidebar-form'>
                <Sidebar />
                <div className='inputs'>
                    <form>
                        <input type="text" placeholder='Name*' />
                        <input type="text" placeholder='Description*' />
                        <input type="text" placeholder='Platform*' />
                        <input type="text" placeholder='Genres' />
                        <input type="text" placeholder='Released date' />
                        <input type="submit" value='Create' className='create-btn' />
                    </form>
                </div>
            </div>
        </div>
    )
}