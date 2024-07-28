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
import GameEdit from './components/game-edit/GameEdit';
import ErrorBoundary from './components/errorBoundary';
import AuthGuard from './components/guards/AuthGuard';



function App() {

    return (
        <ErrorBoundary>
            <AuthProvider>
                <div id="box">
                    <Header />

                    <Routes>
                            <Route path={Path.Home} element={<Home />} />
                            <Route path="/games" element={<GameList />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/games/:gameId" element={<GameDetails />} />

                            <Route element={<AuthGuard />}>
                                <Route path="/games/create" element={<GameCreate />} />
                                <Route path={Path.GameEdit} element={<GameEdit />} />
                                <Route path={Path.Logout} element={<Logout />} />
                            </Route>
                        </Routes>
                </div>
            </AuthProvider>
        </ErrorBoundary>

    )
}

export default App
