// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import '../index.css';
// import Header from "./Header";
// import LandingPage from "./LandingPage";
// import Home from "./Home";
// import Footer from "./Footer";
// import Login from "./Login";
// import Signup from "./Signup";

// function App() {

//     const [users, setUsers] = useState([])

//     useEffect(() => {
//         fetch("http://localhost:3001/users")
//             .then(res => res.json())
//             .then(data => {
//                 setUsers(data)
//                 console.log(data)
//             })
//     }, [])

//     return (
//         <div>

//             <Header />

//             {/* <Home /> */}

//             <Router>
//                 <Routes>
//                     {/* <Route path="/" element={<LandingPage />} /> */}
//                     <Route path="/home" element={<Home />} />
//                     <Route path="/" element={<LandingPage />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/signup" element={<Signup />} />
//                 </Routes>
//             </Router>
//             <Footer />
//         </div>
//     )
// }
// export default App;

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import LandingPage from "./LandingPage";
import Home from "./Home";
import Footer from "./Footer";
import Login from "./Login";
import Signup from "./Signup";

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
                    </Routes>
                </Router>
            </main>

            <Footer />
        </div>
    )
}

export default App;
