import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCart } from "../../services/cart.service";
import { getCurrentSession, logout } from "../../services/auth.service";
import "./Header.scss";
import {ERole} from "../../models/auth";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [cartCount, setCartCount] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("query") || "");
    const [session, setSession] = useState(() => getCurrentSession());

    useEffect(() => {
        const updateCartCount = () => {
            const cart = getCart();
            const totalItems = cart.items.reduce((count, item) => count + item.quantity, 0);
            setCartCount(totalItems);
        };

        const handleSessionChange = () => {
            setSession(getCurrentSession());
        };

        updateCartCount();
        window.addEventListener("cart-updated", updateCartCount);
        window.addEventListener("session-changed", handleSessionChange);

        return () => {
            window.removeEventListener("cart-updated", updateCartCount);
            window.removeEventListener("session-changed", handleSessionChange);
        };
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSearchParams({ query: searchQuery.trim() });
            navigate(`/search?query=${searchQuery.trim()}`);
        }
    };

    const logoutUser = () => {
        logout();
        setSession(null);
        navigate("/login");
    };

    const isAdmin = session?.role === ERole.ROLE_ADMIN;
    const isSales = session?.role === ERole.ROLE_SALES;

    return (
        <header className="navbar navbar-expand-lg bg-white shadow-lg sticky-top header-container">
            <div className="container-fluid">
                <a className="navbar-brand logo" href="/">
                    🌟 <span className="brand-name">SHOPY</span>
                </a>
                <form className="search-bar mx-auto" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search for amazing products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="btn search-btn ms-1 my-0">
                        🔍
                    </button>
                </form>
                <div className="d-flex align-items-center action-buttons">
                    <button
                        className="btn cart-btn position-relative me-3"
                        onClick={() => navigate("/cart")}
                    >
                        🛒
                        {cartCount > 0 && <span className="badge">{cartCount}</span>}
                    </button>
                    {(isAdmin || isSales) && (
                        <>
                            {isAdmin && (
                                <button
                                    className="btn btn-outline-warning btn-sm me-2"
                                    onClick={() => navigate('/admin')}
                                >
                                    Gestion de l'inventaire 🛠️
                                </button>
                            )}
                            <button
                                className="btn btn-outline-info btn-sm me-2"
                                onClick={() => navigate('/admin/order')}
                            >
                                Gestion des commandes 📦
                            </button>
                        </>
                    )}
                    {session ? (
                        <>
                            <button
                                className="btn profile-btn me-3"
                                onClick={() => navigate("/profile")}
                            >
                                🧑‍💼 Mon Compte
                            </button>
                            <button className="btn logout-btn" onClick={logoutUser}>
                                Logout 🚪
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="btn login-btn me-2" onClick={() => navigate("/login")}>
                                Login 🚀
                            </button>
                            <button className="btn register-btn" onClick={() => navigate("/register")}>
                                Register 📝
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
