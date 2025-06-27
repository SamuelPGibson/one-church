import React from "react";

function Header() {
    return (
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo or Brand Name */}
                <div className="text-2xl font-bold">
                    OneChurch
                </div>

                {/* Navigation Links */}
                <nav className="space-x-6">
                    <a href="/" className="hover:text-indigo-300 transition">Home</a>
                    <a href="/posts" className="hover:text-indigo-300 transition">Posts</a>
                    <a href="/events" className="hover:text-indigo-300 transition">Events</a>
                    <a href="/profile" className="hover:text-indigo-300 transition">Profile</a>
                </nav>

                {/* Optional User Action (e.g., Login Button) */}
                <button className="bg-white text-indigo-600 px-4 py-2 rounded hover:bg-indigo-100 transition">
                    Login
                </button>
            </div>
        </header>
    )
}

export default Header;