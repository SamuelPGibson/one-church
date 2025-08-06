/**
 * Unit tests for the API functions
 * These are just intended to make sure the API functions are connecting and returning expected results.
 * They do not test the actual functionality of the API.
 */


import * as api from '../api/api.js';

var BASE_URL = "http://127.0.0.1:8000"

async function testApiFunction(fn, ...args) {
    const result = await fn(...args);
    if (result && result.success === true) {
        return true;
    } else {
        console.log(`Function ${fn.name} failed with result:`, result);
        return false;
    }
}

const USER_ID = 1;
const EVENT_ID = 3;

const tests = [
    { fn: api.loginUser, args: ["user1", "pass1"] },
    { fn: api.logoutUser, args: [2] },
    // { fn: api.createUser, args: [{ username: "testuser2", password: "testpass2" }] },
    // { fn: api.deleteUser, args: [3] },
    { fn: api.userChangePassword, args: [USER_ID, "pass1"] }, // same password
    { fn: api.updateUser, args: [USER_ID, { username: "user1" }] }, // same username
    { fn: api.getUser, args: [USER_ID] },
    { fn: api.getUserOrganizationsAdmin, args: [USER_ID] },
    { fn: api.getUserOrganizationsMember, args: [USER_ID] },
    { fn: api.getUserOrganizationsCongregant, args: [USER_ID] },
    { fn: api.getUserPosts, args: [USER_ID] },
    { fn: api.getUserFollowers, args: [USER_ID] },
    { fn: api.getUserFollowing, args: [USER_ID] },
    // { fn: api.createOrganization, args: ["Test Org", null] },
    // { fn: api.deleteOrganization, args: [1] },
    { fn: api.updateOrganization, args: [1, "Updated Org"] },
    { fn: api.getOrganization, args: [1] },
    { fn: api.getOrganizationChildren, args: [1] },
    { fn: api.getOrganizationPosts, args: [1] },
    { fn: api.getOrganizationAdmins, args: [1] },
    { fn: api.getOrganizationMembers, args: [1] },
    { fn: api.getOrganizationCongregants, args: [1] },
    { fn: api.getOrganizationFollowers, args: [1] },
    { fn: api.getOrganizationFollowing, args: [1] },
    { fn: api.addOrganizationAdmin, args: [1, 1] },
    { fn: api.removeOrganizationAdmin, args: [1, 1] },
    { fn: api.addOrganizationMember, args: [1, 1] },
    { fn: api.removeOrganizationMember, args: [1, 1] },
    { fn: api.addOrganizationCongregant, args: [1, 1] },
    { fn: api.removeOrganizationCongregant, args: [1, 1] },
    { fn: api.follow, args: [1, 2] },
    { fn: api.unfollow, args: [1, 2] },
    { fn: api.createPost, args: [1, "Test Caption", "http://example.com/image.jpg", "Saskatoon"] },
    // { fn: api.deletePost, args: [1] },
    { fn: api.updatePost, args: [1, 1, "Updated Caption", "http://example.com/image2.jpg", "Saskatoon"] },
    { fn: api.getPost, args: [1] },
    { fn: api.createEvent, args: [1, "Test Event", "Description", "2024-01-01T10:00:00Z", "2024-01-01T12:00:00Z", "Test Location"] },
    // { fn: api.deleteEvent, args: [EVENT_ID] },
    { fn: api.updateEvent, args: [EVENT_ID, 1, "Updated Event", "Updated Desc", "2024-01-01T10:00:00Z", "2024-01-01T12:00:00Z", "Updated Location"] },
    { fn: api.getEvent, args: [EVENT_ID] },
    { fn: api.goingEvent, args: [EVENT_ID, 1] },
    { fn: api.removeGoingEvent, args: [EVENT_ID, 1] },
    { fn: api.interestedEvent, args: [EVENT_ID, 1] },
    { fn: api.removeInterestedEvent, args: [EVENT_ID, 1] },
    { fn: api.createComment, args: [EVENT_ID, 1, 0, "This is a test comment"] },
    // { fn: api.deleteComment, args: [1] },
    { fn: api.updateComment, args: [1, "Updated comment"] },
    { fn: api.getComment, args: [1] },
    { fn: api.like, args: [1, 1] },
    { fn: api.removeLike, args: [1, 1] },
    { fn: api.dislike, args: [1, 1] },
    { fn: api.removeDislike, args: [1, 1] },
    { fn: api.getUserPostComments, args: [1, 1, 0, 10] },
    { fn: api.getUserCommentReplies, args: [1, 1, 0, 10] },
    { fn: api.getUserFeed, args: [1, 0, 10] },
    { fn: api.search, args: [USER_ID, "test", true, true, true, true] },
    
    // Messaging API Tests
    { fn: api.getChats, args: [USER_ID] },
    { fn: api.getChatMessages, args: [1, 0, 10] },
    { fn: api.createChat, args: [[{ user_id: 1, is_org: false, role: "member" }, { user_id: 2, is_org: false, role: "member" }]] },
    { fn: api.createGroupChat, args: [[{ user_id: 1, is_org: false, role: "member" }, { user_id: 2, is_org: false, role: "member" }], "Test Group", "http://example.com/group.jpg"] },
    { fn: api.addGroupChatMember, args: [1, { user_id: 3, is_org: false, role: "member" }] },
    { fn: api.removeGroupChatMember, args: [1, 3] },
    { fn: api.createChatMessage, args: [1, USER_ID, "Test message"] },
    //{ fn: api.deleteChatMessage, args: [1, 1] },
    { fn: api.readChatMessage, args: [1, 1, USER_ID] },
    { fn: api.reactToChatMessage, args: [1, 1, USER_ID, "👍"] },
    { fn: api.reactToChatMessage, args: [1, 1, USER_ID, "❤️"] },
    { fn: api.removeChatMessageReaction, args: [1, 1, USER_ID, 2] },
]

let successCount = 0;
let failedCount = 0;

for (const test of tests) {
    const result = await testApiFunction(test.fn, ...test.args, BASE_URL);
    console.log(`Test ${test.fn.name} ${result ? "passed" : "failed"}`);
    if (!result) {
        failedCount++;
        break;
    } else {
        successCount++;
    }
}

console.log("\nUnit Test Summary:");
console.log(`Tests passed: ${successCount}/${successCount + failedCount}`);
