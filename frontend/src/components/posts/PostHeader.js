//Profile Pic and Username
import React from "react";
import sam from "./sam.jpeg";


function Header({name, profile_image_url}) {
    
    return (
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* profile image */}
                <img src={sam} alt={profile_image_url}/>

                {/* username */}
                <div className="hover:text-indigo-300 transition">
                    <p>{name}</p>
                </div>  
            </div>
        </header>
    );
}

export default Header;