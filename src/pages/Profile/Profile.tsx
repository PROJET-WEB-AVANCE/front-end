import React, { useEffect, useState } from 'react';
import { getMyInfos } from '../../services/user.service';
import { UserDto } from '../../models/auth';
import toast from 'react-hot-toast';
import './Profile.scss';
import {useNavigate} from "react-router-dom";

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<UserDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMyInfos = async () => {
            try {
                const data = await getMyInfos();
                setUserInfo(data);
            } catch (err: any) {
                toast.error('Failed to load user info. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyInfos();
    }, []);


    function handleEditProfile() {
         navigate(`/profile/edit`);
    }

    function handleViewOrders() {
        navigate(`/profile/order`);
    }


    if (loading) {
        return <div className="container py-5 text-center">Loading your information...</div>;
    }

    if (!userInfo) {
        return (
            <div className="container py-5 text-center">
                <h2>Failed to fetch your information.</h2>
                <p>Please try again later or contact support.</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="card shadow-lg border-0 rounded-4">
                <div className="card-header bg-primary text-white text-center rounded-top">
                    <h3 className="mb-0">Profile Information</h3>
                </div>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <div className="text-center me-4">
                            <div className="bg-light rounded-circle d-flex justify-content-center align-items-center"
                                 style={{width: 150, height: 150}}>
                                <i className="fas fa-user-circle text-secondary" style={{fontSize: '140px'}}></i>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-primary fw-bold mb-3">{userInfo.firstName} {userInfo.lastName}</h4>
                            <p><strong>Email:</strong> {userInfo.email}</p>
                            <p><strong>Role:</strong> {userInfo.type}</p>
                            <p><strong>Member ID:</strong> {userInfo.id}</p>
                            <button
                                className="btn btn-warning"
                                onClick={() => handleEditProfile()}
                            >
                                Edit Profile ✏️
                            </button>
                            <button
                                className="btn btn-info"
                                onClick={() => handleViewOrders()}
                            >
                                View Orders 📦
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Profile;
