import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { register } from '../services/auth.service';
import { UserCreateDto } from '../models/auth';

const Register: React.FC = () => {
    const [registerRequest, setRegisterRequest] = useState<UserCreateDto>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await register(registerRequest);
            toast.success('Registration successful! You can now login.');
            navigate('/login');
        }catch (err: any) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
                <h3 className="text-center text-primary fw-bold mb-4">Register</h3>
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label className="form-label text-muted">First Name</label>
                        <input
                            type="text"
                            className="form-control rounded-pill shadow-sm"
                            value={registerRequest.firstName}
                            onChange={(e) => setRegisterRequest({ ...registerRequest, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-muted">Last Name</label>
                        <input
                            type="text"
                            className="form-control rounded-pill shadow-sm"
                            value={registerRequest.lastName}
                            onChange={(e) => setRegisterRequest({ ...registerRequest, lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-muted">Email Address</label>
                        <input
                            type="email"
                            className="form-control rounded-pill shadow-sm"
                            value={registerRequest.email}
                            onChange={(e) => setRegisterRequest({ ...registerRequest, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-muted">Password</label>
                        <input
                            type="password"
                            className="form-control rounded-pill shadow-sm"
                            value={registerRequest.password}
                            onChange={(e) => setRegisterRequest({ ...registerRequest, password: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 rounded-pill shadow-sm mt-3">
                        Register
                    </button>
                </form>
                <p className="text-center text-muted mt-3">
                    <small>Already have an account? <button onClick={() => navigate('/login')} className="text-primary fw-bold btn btn-outline-primary">Login</button></small>
                </p>
            </div>
        </div>
    );
};

export default Register;
