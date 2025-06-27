import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './index.css';


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

}
export default App;