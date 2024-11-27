import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import {Toaster} from 'react-hot-toast';
import Header from './components/Header';
import Profile from './pages/Profile';
import Register from "./pages/Register";

const App: React.FC = () => {


    return (
        <div>
            <Toaster/>
            <Router>
                <Header/>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="*" element={<Navigate to="/home" replace/>}/>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
