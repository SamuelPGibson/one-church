import React from "react";
import UserLink from "../UserLink";

const User = ({ user }) => {
  if (!user) return null;

  return (
    <UserLink
      userId={user.id}
      className="flex items-center gap-4 hover:bg-gray-100 rounded-lg p-2 transition"
      showProfilePic={false}
    >
      {/* Profile Picture */}
      <img
        src={user.profile_pic || user.pfp_url || user.profilePicUrl || user.author_pfp || "/default-pfp.png"}
        alt="Profile"
        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        onError={e => { e.target.src = "/default-pfp.png"; }}
      />
      {/* Info column */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-800 truncate">
          {user.username || "Username"}
        </div>
        <div className="text-sm text-gray-700 truncate">
          {user.first_name + " " + user.last_name || ""}
        </div>
      </div>
    </UserLink>
  );
};

const Organization = ({ organization }) => {
  if (!organization) return null;

  return (
    <div className="flex items-center gap-4 hover:bg-gray-100 rounded-lg p-2 transition">
      {/* Organization Icon */}
      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
        🏢
      </div>
      {/* Info column */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-800 truncate">
          {organization.name || "Organization"}
        </div>
        <div className="text-sm text-gray-700 truncate">
          {organization.location || ""}
        </div>
      </div>
    </div>
  );
};

export { User, Organization };
