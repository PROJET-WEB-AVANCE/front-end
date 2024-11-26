import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";
import {UserLoginDto} from '../models/auth';
import {login} from "../services/auth.service";

const Login: React.FC = () => {
    const [loginRequest, setLoginRequest] = useState<UserLoginDto>({email: '', password: ''});
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
        <div className="container py-5">
            <form className="d-flex flex-column align-items-center" onSubmit={handleLogin}>
                <div className="col-12 col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        className="form-control"
                        type="email"
                        value={loginRequest.email}
                        onChange={(e) => setLoginRequest({...loginRequest, email: e.target.value})}
                        required
                    />
                </div>
                <div className="col-12 col-md-6 mt-3">
                    <label className="form-label">Password</label>
                    <input
                        className="form-control"
                        type="password"
                        value={loginRequest.password}
                        onChange={(e) => setLoginRequest({...loginRequest, password: e.target.value})}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary col-12 col-md-6 my-3">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
