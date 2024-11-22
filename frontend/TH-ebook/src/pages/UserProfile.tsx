import React from 'react';
import withAuth from '../components/hoc/withAuth';
import { User } from '../models/User';

interface UserProfileProps {
    user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p>ID: {user.id}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default withAuth(UserProfile);
