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
export async function loginUser(username, password, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/login/`, {
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
export async function logoutUser(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/logout/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });
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
export async function createUser(userData, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/`, {
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
export async function deleteUser(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/`, { method: "DELETE" });
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
export async function userChangePassword(userId, newPassword, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/change_password/`, {
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
export async function updateUser(userId, userData, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/update/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
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
export async function getUser(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/info/`);
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
export async function getUserOrganizationsAdmin(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/organizations/admin/`);
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
export async function getUserOrganizationsMember(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/organizations/member/`);
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
export async function getUserOrganizationsCongregant(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/organizations/congregant/`);
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
export async function getUserPosts(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/posts/`);
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
export async function getUserFollowers(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/followers/`);
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
export async function getUserFollowing(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/following/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get following" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Organization Account

export async function createOrganization(name, parent_id, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/`, {
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

export async function deleteOrganization(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete organization" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function updateOrganization(orgId, name, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/update/`, {
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

export async function getOrganization(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/info/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationChildren(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/children/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization children" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationPosts(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/posts/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization posts" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationAdmins(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/admins/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization admins" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationMembers(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/members/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization members" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationCongregants(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/congregants/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization congregants" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationFollowers(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/followers/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization followers" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getOrganizationFollowing(orgId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/following/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get organization following" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// User/Organization Affiliation

export async function addOrganizationAdmin(orgId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/admins/add/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to add admin" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeOrganizationAdmin(orgId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/admins/remove/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove admin" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function addOrganizationMember(orgId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/members/add/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to add member" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeOrganizationMember(orgId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/members/remove/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove member" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function addOrganizationCongregant(orgId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/congregants/add/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to add congregant" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeOrganizationCongregant(orgId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/organizations/${orgId}/congregants/remove/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove congregant" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Follow/Unfollow

export async function follow(followerId, followeeId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/follow/`, {
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

export async function unfollow(followerId, followeeId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/unfollow/`, {
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

export async function createPost(authorId, caption, imageUrl, location, baseUrl = "") {
  try {
    const body = { author_id: authorId, caption, image_url: imageUrl, location };
    const res = await fetch(`${baseUrl}/api/posts/`, {
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

export async function deletePost(postId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/posts/${postId}/delete/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function updatePost(postId, authorId, caption, imageUrl, location, baseUrl = "") {
  try {
    const body = { author_id: authorId, caption, image_url: imageUrl, location };
    const res = await fetch(`${baseUrl}/api/posts/${postId}/update/`, {
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

export async function getPost(postId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/posts/${postId}/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Events

export async function createEvent(authorId, title, description, startTime, endTime, location, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/events/`, {
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

export async function deleteEvent(eventId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/events/${eventId}/delete/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete event" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function updateEvent(eventId, authorId, title, description, startTime, endTime, location, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/events/${eventId}/update/`, {
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

export async function getEvent(eventId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/events/${eventId}/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get event" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Events Going/Interested

export async function goingEvent(eventId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/events/${eventId}/going/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to mark going" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeGoingEvent(eventId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/events/${eventId}/going/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove going" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function interestedEvent(eventId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/events/${eventId}/interested/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to mark interested" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeInterestedEvent(eventId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/events/${eventId}/interested/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove interested" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Post/Event Comments

export async function createComment(postId, authorId, parentId, content, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/comments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ post_id: postId, author_id: authorId, parent_id: parentId, content }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create comment" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function deleteComment(commentId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/comments/${commentId}/delete/`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete comment" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function updateComment(commentId, content, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/comments/${commentId}/update/`, {
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

export async function getComment(commentId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/comments/${commentId}/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get comment" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Posts Like/Dislike

export async function like(postId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/posts/${postId}/like/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to like post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeLike(postId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/posts/${postId}/like/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove like" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function dislike(postId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/posts/${postId}/dislike/${userId}/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to dislike post" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function removeDislike(postId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/posts/${postId}/dislike/${userId}/remove/`, { method: "POST" });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove dislike" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Post/Event Feed

/**
 * Gets comments for a user's post.
 * @async
 * @function getUserPostComments
 * @param {number} userId - The user ID.
 * @param {number} postId - The post ID.
 * @param {number} [offset=0] - Pagination offset.
 * @param {number} [limit=10] - Pagination limit.
 * @returns {Promise<Object>} Comments or error.
 */
export async function getUserPostComments(userId, postId, offset, limit, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/posts/${postId}/comments/?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get comments" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets replies to a user's comment.
 * @async
 * @function getUserCommentReplies
 * @param {number} userId - The user ID.
 * @param {number} commentId - The comment ID.
 * @param {number} [offset=0] - Pagination offset.
 * @param {number} [limit=10] - Pagination limit.
 * @returns {Promise<Object>} Replies or error.
 */
export async function getUserCommentReplies(userId, commentId, offset, limit, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/comments/${commentId}/replies/?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get replies" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function getUserFeed(userId, offset = 0, limit = 10, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/feed/?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get user feed" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Search

export async function search(userId, query, includePosts = true, includeEvents = true, includeOrganizations = true, includeUsers = true, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/search/?query=${encodeURIComponent(query)}&includePosts=${includePosts}&includeEvents=${includeEvents}&includeOrganizations=${includeOrganizations}&includeUsers=${includeUsers}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to search" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

export async function searchOrganizations(query, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/search/organizations/?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to search organizations" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Searches for events based on the provided query.
 * @async
 * @function searchEvents
 * @param {string} query - The search query.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Search results or error.
 */
export async function searchEvents(query, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/search/events/?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to search events" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

// Messaging API Functions

/**
 * Gets all chats for a user.
 * @async
 * @function getChats
 * @param {number} userId - The ID of the user.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Chats data or error.
 */
export async function getChats(userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/users/${userId}/chats/`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get chats" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Gets messages for a specific chat.
 * @async
 * @function getChatMessages
 * @param {number} chatId - The ID of the chat.
 * @param {number} offset - The offset for pagination.
 * @param {number} limit - The limit for pagination.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Messages data or error.
 */
export async function getChatMessages(chatId, offset = 0, limit = 10, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/${chatId}/messages/?offset=${offset}&limit=${limit}`);
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to get chat messages" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Creates a new chat between users.
 * @async
 * @function createChat
 * @param {Object} members - The members of the chat.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Chat creation result or error.
 */
export async function createChat(members, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ members }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create chat" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Creates a new group chat.
 * @async
 * @function createGroupChat
 * @param {Object} members - The members of the group chat.
 * @param {string} name - The name of the group chat.
 * @param {string} imageUrl - The image URL of the group chat.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Group chat creation result or error.
 */
export async function createGroupChat(members, name, imageUrl, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/group/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ members, name, image_url: imageUrl }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create group chat" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Adds a member to a group chat.
 * @async
 * @function addGroupChatMember
 * @param {number} chatId - The ID of the chat.
 * @param {Object} member - The member to add.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Member addition result or error.
 */
export async function addGroupChatMember(chatId, member, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/${chatId}/members/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ member }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to add group chat member" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Removes a member from a group chat.
 * @async
 * @function removeGroupChatMember
 * @param {number} chatId - The ID of the chat.
 * @param {number} memberId - The ID of the member to remove.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Member removal result or error.
 */
export async function removeGroupChatMember(chatId, memberId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/${chatId}/members/${memberId}/remove/`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove group chat member" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Creates a new message in a chat.
 * @async
 * @function createChatMessage
 * @param {number} chatId - The ID of the chat.
 * @param {number} senderId - The ID of the sender.
 * @param {string} content - The content of the message.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Message creation result or error.
 */
export async function createChatMessage(chatId, senderId, content, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/${chatId}/messages/create/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sender_id: senderId, content }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to create chat message" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Deletes a message from a chat.
 * @async
 * @function deleteChatMessage
 * @param {number} chatId - The ID of the chat.
 * @param {number} messageId - The ID of the message to delete.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Message deletion result or error.
 */
export async function deleteChatMessage(chatId, messageId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/${chatId}/messages/${messageId}/delete/`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to delete chat message" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Marks a message as read by a user.
 * @async
 * @function readChatMessage
 * @param {number} chatId - The ID of the chat.
 * @param {number} messageId - The ID of the message.
 * @param {number} userId - The ID of the user marking the message as read.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Message read result or error.
 */
export async function readChatMessage(chatId, messageId, userId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/${chatId}/messages/${messageId}/read/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to read chat message" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Reacts to a message in a chat.
 * @async
 * @function reactToChatMessage
 * @param {number} chatId - The ID of the chat.
 * @param {number} messageId - The ID of the message.
 * @param {number} userId - The ID of the user reacting.
 * @param {string} reaction - The reaction to add.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Reaction result or error.
 */
export async function reactToChatMessage(chatId, messageId, userId, reaction, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/${chatId}/messages/${messageId}/reactions/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, reaction }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to react to chat message" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}

/**
 * Removes a reaction from a message in a chat.
 * @async
 * @function removeChatMessageReaction
 * @param {number} chatId - The ID of the chat.
 * @param {number} messageId - The ID of the message.
 * @param {number} userId - The ID of the user removing the reaction.
 * @param {number} reactionId - The ID of the reaction to remove.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {Promise<Object>} Reaction removal result or error.
 */
export async function removeChatMessageReaction(chatId, messageId, userId, reactionId, baseUrl = "") {
  try {
    const res = await fetch(`${baseUrl}/api/chats/${chatId}/messages/${messageId}/reactions/${reactionId}/remove/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || "Failed to remove chat message reaction" };
    return data;
  } catch (err) {
    return { error: "Network error or server unavailable" };
  }
}
