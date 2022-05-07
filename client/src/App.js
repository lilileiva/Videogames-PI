import Navbar from './components/Navbar/Navbar.jsx';
import { Route } from 'react-router-dom';
import Searchbar from './components/Searchbar/Searchbar.jsx';
import GameDetail from './components/GameDetail/GameDetail.jsx';
import CreateGame from './components/CreateGame/CreateGame.jsx';
import About from './components/About/About.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Route exact path='/' component={Searchbar} />
      <Route exact path='/gamedetail' component={GameDetail} />
      <Route exact path='/creategame' component={CreateGame} />
      <Route exact path='/about' component={About} />
      <Footer/>
    </div>
  );
}

export default App;
