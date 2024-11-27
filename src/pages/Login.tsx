import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserLoginDto } from '../models/auth';
import { login } from '../services/auth.service';

const Login: React.FC = () => {
    const [loginRequest, setLoginRequest] = useState<UserLoginDto>({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(loginRequest);
            toast.success('Login successful');
            navigate('/home');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center text-primary fw-bold mb-4">Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label text-muted">Email Address</label>
                        <input
                            type="email"
                            className="form-control rounded-pill shadow-sm"
                            value={loginRequest.email}
                            onChange={(e) => setLoginRequest({ ...loginRequest, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-muted">Password</label>
                        <input
                            type="password"
                            className="form-control rounded-pill shadow-sm"
                            value={loginRequest.password}
                            onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm mt-3">
                        Login
                    </button>
                </form>
                <p className="text-center text-muted mt-3">
                    <small>Don't have an account? <button onClick={() => navigate('/register')} className="text-primary fw-bold btn btn-outline-primary">Sign up</button></small>
                </p>
            </div>
        </div>
    );
};

export default Login;
