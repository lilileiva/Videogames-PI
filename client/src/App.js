import { Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import Videogames from './components/Videogames/Videogames.jsx';
import Videogame from './components/Videogame/Videogame.jsx';
import About from './components/About/About.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/gamedetail' component={GameDetail} />
      <Route exact path='/videogames' component={Videogames} />
      <Route exact path='/videogame' component={Videogame} />
      <Route exact path='/about' component={About} />
      <Footer/>
    </div>
  );
}

export default App;
