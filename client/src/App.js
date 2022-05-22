import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import Videogames from './components/Videogames/Videogames.jsx';
import AddedVideogames from './components/AddedVideogames/AddedVideogames.jsx';
import Videogame from './components/Videogame/Videogame.jsx';
import Genres from './components/Genres/Genres.jsx';
import About from './components/About/About.jsx';
import Footer from './components/Footer/Footer.jsx';
import styles from './App.module.css';


function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/videogames' element={<Videogames />} />
        <Route exact path='/videogames/added' element={<AddedVideogames />} />
        <Route exact path='/videogames/:id' element={<GameDetail />} />
        <Route exact path='/genres' element={<Genres />} />
        <Route exact path='/videogame' element={<Videogame />} />
        <Route exact path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
