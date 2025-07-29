import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header({ userId, user, setUserId }) {

    const navigate = useNavigate();

    function handleLogout() {
        setUserId(null);
        navigate("/");
    }

    return (
        <header className="bg-white text-black shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    OneChurch
                </Link>

                {/* Navigation */}
                <nav className="space-x-6 flex items-center">
                    <Link to="/home" className="hover:text-indigo-300 transition">Home</Link>
                    <Link to="/feed" className="hover:text-indigo-300 transition">Feed</Link>
                    <Link to="/explore" className="hover:text-indigo-300 transition">Explore</Link>
                    {/* Dropdown for Create */}
                    <div className="relative group">
                        <button className="hover:text-indigo-300 transition focus:outline-none">
                            Create
                        </button>
                        <div className="absolute left-0 mt-2 w-40 bg-white text-indigo-600 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-10">
                            <Link
                                to="/create-post"
                                className="block px-4 py-2 hover:bg-indigo-100 transition"
                            >
                                Create Post
                            </Link>
                            <Link
                                to="/create-event"
                                className="block px-4 py-2 hover:bg-indigo-100 transition"
                            >
                                Create Event
                            </Link>
                        </div>
                    </div>
                    <Link to="/messaging" className="hover:text-indigo-300 transition">Messaging</Link>
                    <Link to="/profile" className="hover:text-indigo-300 transition">Profile</Link>
                </nav>

                {/* Auth Button */}
                {userId ? (
                    <div className="relative group">
                        <button className="flex items-center focus:outline-none">
                            <img
                                src={user?.pfp_url || "/default-pfp.png"}
                                alt="Profile"
                                className="w-8 h-8 rounded-full border-2 border-white"
                            />
                        </button>
                        <div className="absolute right-0 mt-2 w-40 bg-white text-indigo-600 rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-10">
                            <Link
                                to="/profile"
                                className="block px-4 py-2 hover:bg-indigo-100 transition"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 hover:bg-indigo-100 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
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
