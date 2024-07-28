import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AnimeList from './pages/AnimeList';
import AnimeDetails from './pages/AnimeDetails';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/anime/:id" component={AnimeDetails} />
                    <ProtectedRoute exact path="/" component={AnimeList} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
