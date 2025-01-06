import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage/ArticleDetailsPage";
import SubNavbar from "./components/SubNavbar/SubNavbar";
import CartPage from "./components/CartPage/CartPage";
import SearchPage from "./components/SearchPage/SearchPage";
import Register from "./pages/Register/Register";
import Admin from "./pages/Admin/Admin";

const App: React.FC = () => {
    return (
        <div>
            <Toaster />
            <Router>
                <Header />
                <SubNavbar />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/article/:articleName" element={<ArticleDetailsPage />} />

                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
