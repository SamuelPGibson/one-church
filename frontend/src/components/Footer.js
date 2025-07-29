import React from "react";

function Footer() {
    return (
        <footer className="bg-white text-black py-4">
            <div className="container mx-auto text-center text-sm">
                &copy; {new Date().getFullYear()} OneChurch. All rights reserved.
            </div>
        </footer>
    );
}
export default Footer;
