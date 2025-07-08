/**
  Frontend API interface
*/


/**
 * Logs in a user by sending credentials to the server.
 * @async
 * @function login
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} Auth data or error.
 */
export async function loginUser(username, password) {
  try {
    const res = await fetch("/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to login" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Logs out the current user.
 * @async
 * @function logout
 * @returns {Promise<Object>} Result or error.
 */
export async function logoutUser() {
  try {
    const res = await fetch("/api/logout/", { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to logout" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Creates a new user by sending a POST request to the server.
 *
 * @async
 * @function createUser
 * @param {Object} userData - The user data to be sent in the request body.
 * @returns {Promise<Object>} The created user data if successful, or an error object if failed.
 * @throws {Error} If a network error or server issue occurs.
 */
export async function createUser(userData) {
  try {
    const res = await fetch("/api/users/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || "Failed to create user" };
    }

    const data = await res.json();
    return data;

  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Deletes a user by ID.
 * @async
 * @function deleteUser
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<Object>} Result of deletion or error.
 */
export async function deleteUser(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete user" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Changes a user's password.
 * @async
 * @function userChangePassword
 * @param {number} userId - The user ID.
 * @param {string} newPassword - The new password.
 * @returns {Promise<Object>} Result or error.
 */
export async function userChangePassword(userId, newPassword) {
  try {
    const res = await fetch(`/api/users/${userId}/change_password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ new_password: newPassword }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to change password" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Updates a user's username.
 * @async
 * @function updateUser
 * @param {number} userId - The user ID.
 * @param {string} username - The new username.
 * @returns {Promise<Object>} Result or error.
 */
export async function updateUser(userId, username) {
  try {
    const res = await fetch(`/api/users/${userId}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to update user" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets a user by ID.
 * @async
 * @function getUser
 * @param {number} userId - The user ID.
 * @returns {Promise<Object>} User data or error.
 */
export async function getUser(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get user" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets organizations where user is admin.
 * @async
 * @function getUserOrganizationsAdmin
 * @param {number} userId - The user ID.
 * @returns {Promise<Object>} Organizations or error.
 */
export async function getUserOrganizationsAdmin(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/organizations/admin/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organizations" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets organizations where user is member.
 * @async
 * @function getUserOrganizationsMember
 * @param {number} userId - The user ID.
 * @returns {Promise<Object>} Organizations or error.
 */
export async function getUserOrganizationsMember(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/organizations/member/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organizations" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets organizations where user is congregant.
 * @async
 * @function getUserOrganizationsCongregant
 * @param {number} userId - The user ID.
 * @returns {Promise<Object>} Organizations or error.
 */
export async function getUserOrganizationsCongregant(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/organizations/congregant/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organizations" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets posts by user.
 * @async
 * @function getUserPosts
 * @param {number} userId - The user ID.
 * @returns {Promise<Object>} Posts or error.
 */
export async function getUserPosts(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/posts/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get posts" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets followers of a user.
 * @async
 * @function getUserFollowers
 * @param {number} userId - The user ID.
 * @returns {Promise<Object>} Followers or error.
 */
export async function getUserFollowers(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/followers/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get followers" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets users followed by a user.
 * @async
 * @function getUserFollowing
 * @param {number} userId - The user ID.
 * @returns {Promise<Object>} Following or error.
 */
export async function getUserFollowing(userId) {
  try {
    const res = await fetch(`/api/users/${userId}/following/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get following" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Organization Account

export async function createOrganization(name, parent_id) {
  try {
    const res = await fetch("/api/organizations/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, parent_id }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create organization" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function deleteOrganization(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete organization" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function updateOrganization(orgId, name) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to update organization" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganization(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationChildren(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/children/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization children" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationPosts(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/posts/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization posts" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationAdmins(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/admins/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization admins" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationMembers(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/members/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization members" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationCongregants(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/congregants/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization congregants" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationFollowers(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/followers/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization followers" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationFollowing(orgId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/following/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization following" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// User/Organization Affiliation

export async function addOrganizationAdmin(orgId, userId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/admins/${userId}/add/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to add admin" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeOrganizationAdmin(orgId, userId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/admins/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove admin" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function addOrganizationMember(orgId, userId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/members/${userId}/add/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to add member" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeOrganizationMember(orgId, userId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/members/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove member" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function addOrganizationCongregant(orgId, userId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/congregants/${userId}/add/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to add congregant" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeOrganizationCongregant(orgId, userId) {
  try {
    const res = await fetch(`/api/organizations/${orgId}/congregants/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove congregant" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Follow/Unfollow

export async function follow(followerId, followeeId) {
  try {
    const res = await fetch("/api/follow/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ follower_id: followerId, followee_id: followeeId }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to follow" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function unfollow(followerId, followeeId) {
  try {
    const res = await fetch("/api/unfollow/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ follower_id: followerId, followee_id: followeeId }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to unfollow" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Posts

export async function createPost(authorId, caption, imageUrl, location = null) {
  try {
    const body = { author_id: authorId, caption, image_url: imageUrl };
    if (location) body.location = location;
    const res = await fetch("/api/posts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function deletePost(postId) {
  try {
    const res = await fetch(`/api/posts/${postId}/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function updatePost(postId, authorId, caption, imageUrl, location = null) {
  try {
    const body = { author_id: authorId, caption, image_url: imageUrl };
    if (location) body.location = location;
    const res = await fetch(`/api/posts/${postId}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to update post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getPost(postId) {
  try {
    const res = await fetch(`/api/posts/${postId}/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Events

export async function createEvent(authorId, title, description, startTime, endTime, location) {
  try {
    const res = await fetch("/api/events/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author_id: authorId,
        title,
        description,
        start_time: startTime,
        end_time: endTime,
        location,
      }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create event" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function deleteEvent(eventId) {
  try {
    const res = await fetch(`/api/events/${eventId}/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete event" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function updateEvent(eventId, authorId, title, description, startTime, endTime, location) {
  try {
    const res = await fetch(`/api/events/${eventId}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author_id: authorId,
        title,
        description,
        start_time: startTime,
        end_time: endTime,
        location,
      }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to update event" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getEvent(eventId) {
  try {
    const res = await fetch(`/api/events/${eventId}/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get event" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Events Going/Interested

export async function goingEvent(eventId, userId) {
  try {
    const res = await fetch(`/api/events/${eventId}/going/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to mark going" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeGoingEvent(eventId, userId) {
  try {
    const res = await fetch(`/api/events/${eventId}/going/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove going" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function interestedEvent(eventId, userId) {
  try {
    const res = await fetch(`/api/events/${eventId}/interested/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to mark interested" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeInterestedEvent(eventId, userId) {
  try {
    const res = await fetch(`/api/events/${eventId}/interested/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove interested" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Post/Event Comments

export async function createComment(postId, authorId, content) {
  try {
    const res = await fetch("/api/comments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: postId, author_id: authorId, content }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create comment" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function deleteComment(commentId) {
  try {
    const res = await fetch(`/api/comments/${commentId}/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete comment" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function updateComment(commentId, content) {
  try {
    const res = await fetch(`/api/comments/${commentId}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to update comment" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getComment(commentId) {
  try {
    const res = await fetch(`/api/comments/${commentId}/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get comment" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Posts Like/Dislike

export async function like(postId, userId) {
  try {
    const res = await fetch(`/api/posts/${postId}/like/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to like post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeLike(postId, userId) {
  try {
    const res = await fetch(`/api/posts/${postId}/like/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove like" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function dislike(postId, userId) {
  try {
    const res = await fetch(`/api/posts/${postId}/dislike/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to dislike post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeDislike(postId, userId) {
  try {
    const res = await fetch(`/api/posts/${postId}/dislike/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove dislike" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Post/Event Feed

export async function getUserFeed(userId, offset = 0, limit = 10) {
  try {
    const res = await fetch(`/api/users/${userId}/feed/?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get user feed" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Search

export async function search(query, includePosts = true, includeEvents = true, includeOrganizations = true, includeUsers = true) {
  try {
    const res = await fetch(`/api/search/?query=${encodeURIComponent(query)}&includePosts=${includePosts}&includeEvents=${includeEvents}&includeOrganizations=${includeOrganizations}&includeUsers=${includeUsers}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to search" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function searchOrganizations(query) {
  try {
    const res = await fetch(`/api/search/organizations/?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to search organizations" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function searchEvents(query) {
  try {
    const res = await fetch(`/api/search/events/?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to search events" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}
