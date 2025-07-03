import React, { useState } from "react";

function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        bio: "",
        profilePicture: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const userWithId = {
            id: Date.now(), // or you can let the backend handle it
            ...formData,
        };

        console.log("Registering:", userWithId);

        // attempting to add in the http request
        fetch("http://127.0.0.1:8000/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password
            })
        })
           .then(res => res.json())
           .then(data => console.log(data))
           .catch(err => console.error("Error fetching events:", err));

        // Example POST to JSON server or backend
        // fetch("http://localhost:3001/users", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(userWithId),
        // })
        //     .then((res) => res.json())
        //     .then((data) => {
        //         console.log("Registered user:", data);
        //         // redirect to login or homepage
        //     });
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-indigo-700">Create an Account</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        required
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                    <input
                        type="text"
                        name="profilePicture"
                        placeholder="/images/yourphoto.jpg"
                        value={formData.profilePicture}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700"
                >
                    Register
                </button>
            </form>
        </main>
    );
}

export default Signup;