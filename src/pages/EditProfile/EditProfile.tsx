import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMyInfos, updateUser } from '../../services/user.service';
import { EditedProfileDto, UserDto } from '../../models/auth';
import toast from 'react-hot-toast';
import { getCurrentSession } from "../../services/auth.service";

const EditProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [session, setSession] = useState(() => getCurrentSession());

    const [userInfo, setUserInfo] = useState<UserDto | null>(null);
    const [updatedUserInfo, setUpdatedUserInfo] = useState<EditedProfileDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

    useEffect(() => {
        const handleSessionChange = () => {
            setSession(getCurrentSession());
        };

        window.addEventListener('session-changed', handleSessionChange);

        const fetchUserInfo = async () => {
            if (session?.id !== parseInt(id as string)) {
                navigate('/home');
                return;
            }

            try {
                const data = await getMyInfos();
                setUserInfo(data);
                setUpdatedUserInfo({
                    ...data,
                    password: "",
                });
            } catch (err: any) {
                toast.error('Failed to load user info. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();


        return () => {
            window.removeEventListener('session-changed', handleSessionChange);
        };
    }, [id, session, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (updatedUserInfo) {
            setUpdatedUserInfo({
                ...updatedUserInfo,
                [e.target.name]: e.target.value,
            });
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (updatedUserInfo) {
            setIsSaving(true);
            try {
                await updateUser(updatedUserInfo);
                toast.success('Profile updated successfully');

                navigate(`/profile/${userInfo!.id}`);
            } catch (err: any) {
                toast.error('Failed to update profile. Please try again.');
            } finally {
                setIsSaving(false);
            }
        }
    };

    if (loading) {
        return <div className="container py-5 text-center">Loading user information...</div>;
    }

    if (!userInfo) {
        return (
            <div className="container py-5 text-center">
                <h2>Failed to load user information.</h2>
                <p>Please try again later or contact support.</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-primary text-white text-center rounded-top">
                    <h3 className="mb-0">Edit Profile</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={updatedUserInfo?.firstName || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">
                                Last Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={updatedUserInfo?.lastName || ''}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">
                                New Password
                            </label>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={updatedUserInfo?.password || ''}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="position-relative   translate-top p-2 border-0 bg-transparent"
                                style={{cursor: 'pointer'}}
                                onClick={togglePasswordVisibility}
                            >
                                <i className={`fas ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'} text-secondary`}/>
                            </button>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
