import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import {getCurrentSession, logout} from "../../services/auth.service";

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState(() => getCurrentSession());

    useEffect(() => {
        const handleSessionChange = () => {
            setSession(getCurrentSession());
        };

        window.addEventListener('session-changed', handleSessionChange);
        return () => {
            window.removeEventListener('session-changed', handleSessionChange);
        };
    }, []);

    const logoutUser = () => {
        logout();
        setSession(null);
        navigate('/login');
    };

    return (
        <header className="navbar navbar-expand-lg navbar-light bg-light px-3 custom-header">
            <a className="navbar-brand" href="/">
                🌟 SHOPY 🌟
            </a>
            <div className="ms-auto d-flex align-items-center">
                <button
                    className="btn btn-outline-secondary btn-sm me-2"
                    onClick={() => navigate('/articles')}
                >
                    View All Articles 📚
                </button>
                {session ? (
                    <>
                        <a
                            className="me-3 text-decoration-none text-dark"
                            href="/profile"
                            title="My Profile"
                        >
                            <i className="fas fa-user-circle fs-4"></i>
                        </a>
                        <span className="me-3">👋 Hello, {session.firstName}</span>
                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={logoutUser}
                        >
                            Logout 🚪
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => navigate('/login')}
                        >
                            Login 🚀
                        </button>
                        <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => navigate('/register')}
                        >
                            Register 📝
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
