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


function App() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data)
                console.log(data)
            })
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow">
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/events" element={<Events />} />
                    </Routes>
                </Router>
            </main>

            <Footer />
        </div>
    )
}

export default App;
