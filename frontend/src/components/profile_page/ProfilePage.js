import React from "react";

const ProfilePage = ({ userId }) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <header className="text-4xl font-bold text-blue-700 mb-4">
                Profile Page
            </header>
            <p className="text-lg text-gray-600 max-w-xl text-center">
                Welcome to your profile page. Here you can view and edit your personal information.
            </p>
        </div>
    );
};

export default ProfilePage;
