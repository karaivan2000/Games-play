import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as authService from "./services/authService";
import AuthContext from './context/authContext';
import Path from './path';

import Header from "./components/headers/Header"
import Home from "./components/home/Home"
import GameCreate from './components/game-create/GameCreate';
import Login from './components/login/Login';
import Register from './components/register/Register';
import GameList from './components/game-list/GameList';
import GameDetails from './components/game-details/gameDetails';


function App() {
  const [auth, setAuth] = useState({});
  const navigate = useNavigate();

  const loginSubmitHandler = async (values) => {
    const result = await authService.login(values.email, values.password);

    setAuth(result);

    navigate(Path.Home);
  };

  const registerSubmitHandler = async(values) => {
    const result = await authService.register(values.email, values.password);

    setAuth(result);

    navigate(Path.Home);
  };

  const values = { 
    loginSubmitHandler,
    registerSubmitHandler,
    username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.email,
  };

  return (
    <AuthContext.Provider value={ values }>
      <div id="box">
        <Header />

        <Routes>
          <Route path={Path.Home} element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/create" element={<GameCreate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/games/:gameId" element={<GameDetails />} />
        </Routes>

      </div>
    </AuthContext.Provider>
  )
}

export default App
