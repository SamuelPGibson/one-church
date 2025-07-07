import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import LandingPage from "./LandingPage";
import Home from "./Home";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";
import Events from "./Events";
import Profile from "./Profile";
import MakePost from "./posts/MakePost"
import Post from "./posts/Post"
function App() {


    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />

                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/makepost" element={<MakePost />} />
                    </Routes>
                </div>

                <Footer />
            </div>

            <Routes>
                
                <Route path="/displaypost" element={<Post postId={1}/>} />
            </Routes>

            
        </Router>
    );
}

export default App;
