import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-indigo-600 text-white px-4">
            <div className="text-center bg-white/10 p-10 rounded-2xl shadow-xl backdrop-blur-md">
                <h1 className="text-4xl font-bold mb-4">Welcome to OneChurch</h1>
                <p className="text-lg mb-8 max-w-md mx-auto">
                    A social networking platform for the Body of Christ to connect with each other across the globe.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/login"
                        className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-indigo-100 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/signup"
                        className="bg-indigo-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-indigo-700 transition"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </main>
    );
}
