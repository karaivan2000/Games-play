import { Routes, Route}  from 'react-router-dom';

import Header from "./components/headers/Header"
import Home from "./components/home/Home"

import GameCreate from './components/game-create/GameCreate';
import Login from './components/login/Login';
import Register from './components/register/Register';
import GameList from './components/game-list/GameList';
import GameDetails from './components/game-details/gameDetails';


function App() {
  return (
    <div id="box">
        <Header/>

        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/games" element={ <GameList />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:gameId" element={<GameDetails />} />
        </Routes>
        
    </div>
  )
}

export default App
