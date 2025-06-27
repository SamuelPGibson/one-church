// import React, { useState } from "react";

// export default function Login() {
//     const [formData, setFormData] = useState({
//         username: "",
//         password: "",
//     });

//     function handleChange(e) {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         console.log("Logging in with:", formData);
//         // Add real login logic here
//     }

//     return (
//         <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//             <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//                 <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
//                     Login to OneChurch
//                 </h2>
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                             Username
//                         </label>
//                         <input
//                             type="text"
//                             name="username"
//                             id="username"
//                             required
//                             value={formData.username}
//                             onChange={handleChange}
//                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             id="password"
//                             required
//                             value={formData.password}
//                             onChange={handleChange}
//                             className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </main>
//     );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("Logging in with:", formData);

        // Replace this with your real login check:
        if (formData.username === "bernard26" && formData.password === "password123") {
            // Login successful — redirect to home page
            navigate("/home");
        } else {
            alert("Invalid username or password");
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">
                    Login to OneChurch
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
}
