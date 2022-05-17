import { Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/videogames' component={Videogames} />
        <Route exact path='/videogames/added' component={AddedVideogames} />
        <Route exact path='/videogames/:id' component={GameDetail} />
        <Route exact path='/genres' component={Genres} />
        <Route exact path='/videogame' component={Videogame} />
        <Route exact path='/about' component={About} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
