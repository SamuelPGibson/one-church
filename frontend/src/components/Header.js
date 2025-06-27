import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    function handleLogout() {
        localStorage.removeItem("currentUser");
        navigate("/");
    }

    return (
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    OneChurch
                </Link>

                {/* Navigation */}
                <nav className="space-x-6">
                    <Link to="/home" className="hover:text-indigo-300 transition">Home</Link>
                    <Link to="/posts" className="hover:text-indigo-300 transition">Posts</Link>
                    <Link to="/events" className="hover:text-indigo-300 transition">Events</Link>
                    {currentUser && (
                        <Link to="/profile" className="hover:text-indigo-300 transition">Profile</Link>
                    )}
                </nav>

                {/* Auth Button */}
                {currentUser ? (
                    <button
                        onClick={handleLogout}
                        className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100 transition"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100 transition"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}

export default Header;
