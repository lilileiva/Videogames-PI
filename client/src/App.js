import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import Videogame from './components/Videogame/Videogame.jsx';
import Genres from './components/Genres/Genres.jsx';
import About from './components/About/About.jsx';
import Footer from './components/Footer/Footer.jsx';
import styles from './App.module.css';
import NotFound from './components/NotFound/NotFound.jsx';


function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/videogame/:id' element={<GameDetail />} />
        <Route exact path='/genres' element={<Genres />} />
        <Route exact path='/createvideogame' element={<Videogame />} />
        <Route exact path='/about' element={<About />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
