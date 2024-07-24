import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthProvider } from './context/authContext';
import Path from './path';

import Header from "./components/headers/Header"
import Home from "./components/home/Home"
import GameCreate from './components/game-create/GameCreate';
import Login from './components/login/Login';
import Register from './components/register/Register';
import GameList from './components/game-list/GameList';
import GameDetails from './components/game-details/gameDetails';
import Logout from './components/logout/Logout';



function App() {

  return (
    <AuthProvider>
      <div id="box">
        <Header />

        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:gameId" element={<GameDetails />} />
          <Route path={Path.Logout} element={<Logout />} />
        </Routes>

      </div>
    </AuthProvider>
  )
}

export default App
