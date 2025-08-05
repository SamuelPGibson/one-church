//Profile Pic and Username
import React from "react";
import sam from "./sam.jpeg";
import UserLink from "../UserLink";

function Header({name, profile_image_url, userId}) {
    
    return (
        <header className="bg-indigo-600 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* profile image */}
                <UserLink 
                    userId={userId}
                    showProfilePic={true}
                    profilePicUrl={profile_image_url || sam}
                    profilePicSize="w-12 h-12"
                    className="flex-shrink-0"
                />

                {/* username */}
                <UserLink 
                    userId={userId}
                    className="hover:text-indigo-300 transition"
                >
                    <p>{name}</p>
                </UserLink>  
            </div>
        </header>
    );
}

export default Header;