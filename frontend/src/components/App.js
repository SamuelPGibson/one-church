import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

function App() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then((data) => setUsers(data));
    }, [])

}
export default App;