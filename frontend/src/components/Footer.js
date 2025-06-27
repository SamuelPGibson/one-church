import React from "react";

function Footer() {
    return (
        <footer className="bg-indigo-600 text-white py-4 mt-auto">
            <div className="container mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} OneChurch. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;