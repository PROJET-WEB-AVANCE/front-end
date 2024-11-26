import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast";

const App: React.FC = () => {


    return (
        <div>
            <Toaster />
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </Router>
        </div>
    );
};

export default App;
