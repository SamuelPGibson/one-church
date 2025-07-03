# OneChurch - API Documentation

## Rules

* All API calls on the frontend must end with a trailing slash (/) - to avoid issues with Django's URL routing.
* () means that whatever is within the braces can be replaced depending on data/ip/domain name.
* All API calls use HTTP methods (GET, PUT, DELETE, POST) - API calls are marked with the method.

## Return Values

All API calls return a JSON dictionary in the form:

```json
{
    "success" : True,
    "message" : {success message or explanation of error},
}
```

Returns of API calls to create a new entry (account, post, etc) include the ID of the new entry:

```json
{
    "success" : True,
    "message" : "Successfully created entry",
    "id" : (int),
}
```

Returns of API calls to fetch data (GET requests) include the fetched data:

```json
{
    "success" : True,
    "message" : "Successfully fetched data",
    "data" : {fetched data}
}
```

* If "success" is False, there will be no "data" or "id" field, but there will be an error message in "message".
* The expected data type will be annotated in the return with `<DataType>`

## Data Classes

### Lists\<DataType>

```json
[(data1), ..., (dataN)]
```

### User

```json
{
    "id": (int),
    "username": "(string)",
    "password": "(string)"
}
```

### Organization

```json
{
    "id": (int),
    "name": "(string)",
    "description": "(string)"
}
```

### Post

```json
{
    "id": (int),
    "author_id": (int),
    "caption": "(string)",
    "image_url": "(string)",
    "location": "(string)"
}
```

### Event

```json
{
    "id": (int),
    "author_id": (int),
    "title": "(string)",
    "description": "(string)",
    "start_time": "(datetime)",
    "end_time": "(datetime)",
    "location": "(string)"
}
```

### Comment

```json
{
    "id": (int),
    "post_id": (int),
    "author_id": (int),
    "content": "(string)"
}
```

### Like

```json
{
    "post_id": (int),
    "user_id": (int)
}
```

### Dislike

```json
{
    "post_id": (int),
    "user_id": (int)
}
```

### Follower

```json
{
    "follower_id": (int),
    "followee_id": (int)
}
```

## API Calls

### Login

Checks the validity of the username and password, and returns the user's ID if valid.

```http
POST /api/login
{
    "username": "(string)",
    "password": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Successfully logged in",
    "id": (int)
}
```

Failure return:

```http
{
    "success": False,
    "message": "Invalid username or password"
}
```

### Logout

Logs out the user with the given user ID.

```http
POST /api/logout
{
    "user_id": (int)
}
```

Success return:

```http
{
    "success": True,
    "message": "Successfully logged out"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Logout failed"
}
```

---

### Create User

Creates a new user account.

```http
POST /api/users
{
    "username": "(string)",
    "password": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Successfully created user",
    "id": (int)
}
```

Failure return:

```http
{
    "success": False,
    "message": "User creation failed"
}
```

---

### Delete User

Deletes a user account by user ID.

```http
DELETE /api/users/(user_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully deleted user"
}
```

Failure return:

```http
{
    "success": False,
    "message": "User deletion failed"
}
```

---

### Change User Password

Changes the password for a user.

```http
POST /api/users/(user_id)/change_password
{
    "new_password": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Password changed successfully"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Password change failed"
}
```

---

### Update User

Updates the username for a user.

```http
POST /api/users/(user_id)/update
{
    "username": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "User updated successfully"
}
```

Failure return:

```http
{
    "success": False,
    "message": "User update failed"
}
```

---

### Get User

Fetches user data by user ID.

```http
GET /api/users/(user_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched user",
    "data": <User>
}
```

Failure return:

```http
{
    "success": False,
    "message": "User not found"
}
```

---

### Get User's Organizations (Admin/Member/Congregant)

Fetches organizations where the user is an admin, member, or congregant.

```http
GET /api/users/(user_id)/organizations_admin
GET /api/users/(user_id)/organizations_member
GET /api/users/(user_id)/organizations_congregant
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched organizations",
    "data": <List<Organization>>
}
```

Failure return:

```http
{
    "success": False,
    "message": "No organizations found"
}
```

---

### Get User's Posts

Fetches all posts authored by the user.

```http
GET /api/users/(user_id)/posts
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched posts",
    "data": <List<Post>>
}
```

Failure return:

```http
{
    "success": False,
    "message": "No posts found"
}
```

---

### Get User's Followers / Following

Fetches followers or following users for a user.

```http
GET /api/users/(user_id)/followers
GET /api/users/(user_id)/following
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched users",
    "data": <List<User>>
}
```

Failure return:

```http
{
    "success": False,
    "message": "No users found"
}
```

---

### Create Organization

Creates a new organization.

```http
POST /api/organizations
{
    "name": "(string)",
    "parent_id": (int)
}
```

Success return:

```http
{
    "success": True,
    "message": "Successfully created organization",
    "id": (int)
}
```

Failure return:

```http
{
    "success": False,
    "message": "Organization creation failed"
}
```

---

### Delete Organization

Deletes an organization by ID.

```http
DELETE /api/organizations/(org_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully deleted organization"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Organization deletion failed"
}
```

---

### Update Organization

Updates the name of an organization.

```http
POST /api/organizations/(org_id)/update
{
    "name": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Organization updated successfully"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Organization update failed"
}
```

---

### Get Organization

Fetches organization data by ID.

```http
GET /api/organizations/(org_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched organization",
    "data": <Organization>
}
```

Failure return:

```http
{
    "success": False,
    "message": "Organization not found"
}
```

---

### Get Organization Children

Fetches child organizations of a given organization.

```http
GET /api/organizations/(org_id)/children
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched child organizations",
    "data": <List<Organization>>
}
```

Failure return:

```http
{
    "success": False,
    "message": "No child organizations found"
}
```

---

### Get Organization's Posts

Fetches all posts for an organization.

```http
GET /api/organizations/(org_id)/posts
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched posts",
    "data": <List<Post>>
}
```

Failure return:

```http
{
    "success": False,
    "message": "No posts found"
}
```

---

### Get Organization Admins / Members / Congregants

Fetches users who are admins, members, or congregants of an organization.

```http
GET /api/organizations/(org_id)/admins
GET /api/organizations/(org_id)/members
GET /api/organizations/(org_id)/congregants
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched users",
    "data": <List<User>>
}
```

Failure return:

```http
{
    "success": False,
    "message": "No users found"
}
```

---

### Get Organization Followers / Following

Fetches followers or following organizations for an organization.

```http
GET /api/organizations/(org_id)/followers
GET /api/organizations/(org_id)/following
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched organizations",
    "data": <List<Organization>>
}
```

Failure return:

```http
{
    "success": False,
    "message": "No organizations found"
}
```

---

### Add/Remove Organization Admin/Member/Congregant

Adds or removes a user as admin, member, or congregant of an organization.

```http
POST /api/organizations/(org_id)/add_admin/(user_id)
POST /api/organizations/(org_id)/remove_admin/(user_id)
POST /api/organizations/(org_id)/add_member/(user_id)
POST /api/organizations/(org_id)/remove_member/(user_id)
POST /api/organizations/(org_id)/add_congregant/(user_id)
POST /api/organizations/(org_id)/remove_congregant/(user_id)
```

Success return:

```http
{
    "success": True,
    "message": "Operation successful"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Operation failed"
}
```

---

### Follow / Unfollow

Follows or unfollows a user or organization.

```http
POST /api/follow
{
    "follower_id": (int),
    "followee_id": (int)
}
POST /api/unfollow
{
    "follower_id": (int),
    "followee_id": (int)
}
```

Success return:

```http
{
    "success": True,
    "message": "Operation successful"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Operation failed"
}
```

---

### Create Post

Creates a new post.

```http
POST /api/posts
{
    "author_id": (int),
    "caption": "(string)",
    "image_url": "(string)",
    "location": "(string, optional)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Successfully created post",
    "id": (int)
}
```

Failure return:

```http
{
    "success": False,
    "message": "Post creation failed"
}
```

---

### Delete Post

Deletes a post by ID.

```http
DELETE /api/posts/(post_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully deleted post"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Post deletion failed"
}
```

---

### Update Post

Updates a post.

```http
POST /api/posts/(post_id)/update
{
    "author_id": (int),
    "caption": "(string)",
    "image_url": "(string)",
    "location": "(string, optional)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Post updated successfully"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Post update failed"
}
```

---

### Get Post

Fetches a post by ID.

```http
GET /api/posts/(post_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched post",
    "data": <Post>
}
```

Failure return:

```http
{
    "success": False,
    "message": "Post not found"
}
```

---

### Create Event

Creates a new event.

```http
POST /api/events
{
    "author_id": (int),
    "title": "(string)",
    "description": "(string)",
    "start_time": "(datetime)",
    "end_time": "(datetime)",
    "location": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Successfully created event",
    "id": (int)
}
```

Failure return:

```http
{
    "success": False,
    "message": "Event creation failed"
}
```

---

### Delete Event

Deletes an event by ID.

```http
DELETE /api/events/(event_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully deleted event"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Event deletion failed"
}
```

---

### Update Event

Updates an event.

```http
POST /api/events/(event_id)/update
{
    "author_id": (int),
    "title": "(string)",
    "description": "(string)",
    "start_time": "(datetime)",
    "end_time": "(datetime)",
    "location": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Event updated successfully"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Event update failed"
}
```

---

### Get Event

Fetches an event by ID.

```http
GET /api/events/(event_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched event",
    "data": <Event>
}
```

Failure return:

```http
{
    "success": False,
    "message": "Event not found"
}
```

---

### Going / Interested in Event

Marks a user as going or interested in an event.

```http
POST /api/events/(event_id)/going/(user_id)
POST /api/events/(event_id)/remove_going/(user_id)
POST /api/events/(event_id)/interested/(user_id)
POST /api/events/(event_id)/remove_interested/(user_id)
```

Success return:

```http
{
    "success": True,
    "message": "Operation successful"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Operation failed"
}
```

---

### Create Comment

Creates a comment on a post or event.

```http
POST /api/comments
{
    "post_id": (int),
    "author_id": (int),
    "content": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Successfully created comment",
    "id": (int)
}
```

Failure return:

```http
{
    "success": False,
    "message": "Comment creation failed"
}
```

---

### Delete Comment

Deletes a comment by ID.

```http
DELETE /api/comments/(comment_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully deleted comment"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Comment deletion failed"
}
```

---

### Update Comment

Updates a comment.

```http
POST /api/comments/(comment_id)/update
{
    "content": "(string)"
}
```

Success return:

```http
{
    "success": True,
    "message": "Comment updated successfully"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Comment update failed"
}
```

---

### Get Comment

Fetches a comment by ID.

```http
GET /api/comments/(comment_id)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched comment",
    "data": <Comment>
}
```

Failure return:

```http
{
    "success": False,
    "message": "Comment not found"
}
```

---

### Like / Dislike Post

Likes or dislikes a post.

```http
POST /api/posts/(post_id)/like/(user_id)
POST /api/posts/(post_id)/remove_like/(user_id)
POST /api/posts/(post_id)/dislike/(user_id)
POST /api/posts/(post_id)/remove_dislike/(user_id)
```

Success return:

```http
{
    "success": True,
    "message": "Operation successful"
}
```

Failure return:

```http
{
    "success": False,
    "message": "Operation failed"
}
```

---

### Search

Performs a search for users, organizations, or events.

```http
GET /api/search?query=(string)
GET /api/search/organizations?query=(string)
GET /api/search/events?query=(string)
```

Success return:

```http
{
    "success": True,
    "message": "Successfully fetched results",
    "data": <List<DataType>>
}
```

Failure return:

```http
{
    "success": False,
    "message": "No results found"
}
```
