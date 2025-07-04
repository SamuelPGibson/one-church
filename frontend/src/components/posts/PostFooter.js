// likes, dislikes, and comments
import React from "react";

function Footer({likes, dislikes}) {
    return (
        <footer className="bg-indigo-600 text-white py-4">
            <div className="container mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} OneChurch. All rights reserved.
            </div>

            <div>
                <h1>`likes: {likes}`</h1>
                <h1>`dislikes: `{dislikes}</h1>
            </div>

        </footer>
    );
}
export default Footer;