import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import LandingPage from "./LandingPage";
import Home from "./Home";
import Footer from "./Footer";
import Login from "./auth_page/Login";
import Signup from "./auth_page/Signup";
import FeedPage from "./feed_page/FeedPage";
import ExplorePage from "./explore_page/ExplorePage";
import CreatePost from "./create_page/CreatePost";
import CreateEvent from "./create_page/CreateEvent";
import MessagingPage from "./messaging_page/MessagingPage";
import ProfilePage from "./profile_page/ProfilePage";

function App() {
    const [userId, setUserId] = useState(null);

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />

                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login setUserId={setUserId} />} />
                        <Route path="/signup" element={<Signup setUserId={setUserId} />} />
                        <Route path="/feed" element={<FeedPage userId={userId} />} />
                        <Route path="/explore" element={<ExplorePage userId={userId} />} />
                        <Route path="/create-post" element={<CreatePost userId={userId} />} />
                        <Route path="/create-event" element={<CreateEvent userId={userId} />} />
                        <Route path="/messaging" element={<MessagingPage userId={userId} />} />
                        <Route path="/profile" element={<ProfilePage userId={userId} />} />
                    </Routes>
                </div>

                <Footer />
            </div>            
        </Router>
    );
}

export default App;
