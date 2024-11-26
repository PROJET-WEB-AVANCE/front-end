import React, { useEffect, useState } from 'react';
import { getCurrentSession } from '../services/auth.service';
import { JwtPayload } from '../models/auth';

const Home: React.FC = () => {
    const [session, setSession] = useState<JwtPayload | null>(null);

    useEffect(() => {
        const session = getCurrentSession();
        setSession(session);
    }, []);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {session ? (
                <div>
                    <p>User is logged in</p>
                    <p>ID: {session.id}</p>
                    <p>Rank: {session.role}</p>
                </div>
            ) : (
                <p>User is not logged in</p>
            )}
        </div>
    );
};

export default Home;