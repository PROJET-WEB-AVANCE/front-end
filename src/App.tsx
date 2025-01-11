import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage/ArticleDetailsPage";
import SubNavbar from "./components/SubNavbar/SubNavbar";
import CartPage from "./pages/CartPage/CartPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import Register from "./pages/Register/Register";
import Admin from "./pages/Admin/Admin";
import AdminOrder from "./pages/AdminOrder/AdminOrder";
import EditItem from "./pages/EditItem/EditItem";
import EditProfile from "./pages/EditProfile/EditProfile";
import MyOrders from "./pages/myorders/MyOrders";
import EditOrder from "./pages/EditOrder/EditOrder";

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
                    <Route path="/admin/order" element={<AdminOrder/>}/>
                    <Route path="/admin/edit/:id" element={<EditItem/>}/>
                    <Route path="/category/:categoryName" element={<CategoryPage />} />
                    <Route path="/article/:articleName" element={<ArticleDetailsPage />} />
                    <Route path="/profile/edit" element={<EditProfile/>}/>
                    <Route path="/profile/order" element={<MyOrders/>}/>
                    <Route path="/admin/order/:id" element={<EditOrder/>}/>

                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
