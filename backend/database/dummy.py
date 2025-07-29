'''
Dummy database module for testing
'''

from .database import Database

class DummyDatabase(Database):
    ''' Dummy database implementation for testing only
    '''
    def __init__(self):
        ''' Initialize the Dummy database '''
        self._account_id = 1
        self._post_id = 1

        self.users: list[dict] = []
        self.organizations: list[dict] = []
        self.org_admins: list[dict] = [] # [org_id, user_id]
        self.org_members: list[dict] = [] # [org_id, user_id]
        self.org_congregants: list[dict] = [] # [org_id, user_id]

        self.posts: list[dict] = [] # [author_id, caption, image_url, location, post_id]
        self.events: list[dict] = []
        self.comments: list[dict] = []
        self.likes: list[dict] = []
        self.dislikes: list[dict] = []
        self.followers: list[dict] = [] # list of dicts with keys: follower_id, followee_id
        self.going_events: list[dict] = []
        self.interested_events: list[dict] = []

        self.__create_dummy_data()

    def __create_dummy_data(self):
        ''' Create some dummy data for testing '''
        self._account_id = 3
        self._post_id = 3
        self.users = [
            {"id": 1, "username": "user1", "password": "pass1", "pfp_url": "https://cw39.com/wp-content/uploads/sites/10/2016/01/s036012017.jpg"},
            {"id": 2, "username": "user2", "password": "pass2", "pfp_url": "https://helloartsy.com/wp-content/uploads/kids/farm-animals/how-to-draw-a-cow-face/how-to-draw-a-cow-face-step-6.jpg"}
        ]
        self.organizations = [
            {"id": 1, "name": "Org1", "parent_id": 0},
            {"id": 2, "name": "Org2", "parent_id": 0}
        ]
        self.posts = [
            {"id": 1, "author_id": 1,
             "caption": "This is the caption of the first ever post on OneChurch! All for the glory of God!",
             "timestamp": "2023-10-01T10:00:00Z",
             "image_url": "https://t3.ftcdn.net/jpg/02/76/44/92/360_F_276449235_z71XmvtwDHfqxNt6UCK5yl4mAplD3cds.jpg",
             "location": "Saskatoon", "type": "post"},
            {"id": 2, "author_id": 2, "caption": "Post by user2", "timestamp": "2023-10-02T10:00:00Z",
             "image_url": "https://t3.ftcdn.net/jpg/02/76/44/92/360_F_276449235_z71XmvtwDHfqxNt6UCK5yl4mAplD3cds.jpg",
             "location": None, "type": "post"},
        ]
        self.events = [
            {"id": 3, "author_id": 1, "title": "Event by user1", "description": "Description of event", 
             "start_time": "2023-10-01T10:00:00Z", "end_time": "2023-10-01T12:00:00Z",
             "location": "Location1", "type": "event",
             "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy5pXMLHcrqN-HmGJ97Rr9bcoAf8_EqzZZOg&s"},
            {"id": 4, "author_id": 2, "title": "Event by user2", "description": "Description of event", 
             "start_time": "2023-10-02T10:00:00Z", "end_time": "2023-10-02T12:00:00Z",
             "location": "Location2", "type": "event",
             "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy5pXMLHcrqN-HmGJ97Rr9bcoAf8_EqzZZOg&s"},
        ]
        self.comments = [
            {"id": 1, "post_id": 1, "parent_id": 0, "author_id": 2, "content": "Comment on post by user1"},
            {"id": 3, "post_id": 1, "parent_id": 0, "author_id": 2, "content": "Another comment on post by user1"},
            {"id": 4, "post_id": 1, "parent_id": 0, "author_id": 2, "content": "3rd comment on post by user1"},
            {"id": 5, "post_id": 1, "parent_id": 3, "author_id": 1, "content": "user2 replies to comment by user1"},
            {"id": 2, "post_id": 2, "parent_id": 0, "author_id": 1, "content": "Comment on post by user2"}
        ]
        self.likes = [
            {"post_id": 1, "user_id": 2},
            {"post_id": 2, "user_id": 1}
        ]
        self.going_events = [
            {"event_id": 3, "user_id": 1},
            {"event_id": 4, "user_id": 2}
        ]

    # Tests
    def get_test(self) -> dict:
        return {"message": "Connected to Dummy Database"}
    
    def get_int_test(self, int_value: int) -> dict:
        return {"int_value": int_value, "message": f"Received integer value {int_value}"}

    
    # Login and Logout
    def authenticate_user(self, username: str, password: str) -> dict:
        print(f"Authenticating user: {username} with password: {password}")
        for user in self.users:
            if user['username'] == username and user['password'] == password:
                return {
                    "success": True,
                    "id": user['id'],
                    "message": "User authenticated successfully"
                }
        return {
            "success": False,
            "message": "Invalid username or password"
        }

    def logout_user(self, user_id: int) -> dict:
        return {
            "success": True,
            "message": f"User {user_id} logged out successfully"
        }

    # User Account
    def create_user(self, username: str, password: str) -> dict:
        print(f"Creating user: {username} with password: {password}")
        for user in self.users:
            if user["username"] == username:
                return {
                    "success": False,
                    "message": "Username already taken"
                }

        user = {
            "id": self._account_id,
            "username": username,
            "password": password
        }
        self._account_id += 1
        self.users.append(user)
        return {
            "success": True,
            "message": "User created successfully",
            "id": user["id"]
        }

    def delete_user(self, user_id: int) -> dict:
        for user in self.users:
            if user['id'] == user_id:
                self.users.remove(user)
                return {
                    "success": True,
                    "message": "User deleted successfully"
                }
        return {
            "success": False,
            "message": "User not found"
        }

    def user_change_password(self, user_id: int, new_password: str) -> dict:
        for user in self.users:
            if user['id'] == user_id:
                user['password'] = new_password
                return {
                    "success": True,
                    "message": "Password changed successfully"
                }
        return {
            "success": False,
            "message": "User not found"
        }

    def update_user(self, user_id: int, username: str) -> dict:
        for user in self.users:
            if user['id'] == user_id:
                user['username'] = username
                return {
                    "success": True,
                    "message": "User updated successfully"
                }
        return {
            "success": False,
            "message": "User not found"
        }

    def get_user(self, user_id: int) -> dict:
        for user in self.users:
            if user['id'] == user_id:
                return {
                    "success": True,
                    "message": "User found",
                    "data": user
                }
        return {
            "success": False,
            "message": "User not found"
        }

    def get_user_organizations_admin(self, user_id: int) -> dict:
        return {
            "success": True,
            "message": "No organizations found for user - default hardcoded",
            "data": []
        }

    def get_user_organizations_member(self, user_id: int) -> dict:
        return {
            "success": True,
            "message": "No organizations found for user - default hardcoded",
            "data": []
        }

    def get_user_organizations_congregant(self, user_id: int) -> dict:
        return {
            "success": True,
            "message": "No organizations found for user - default hardcoded",
            "data": []
        }

    def get_user_posts(self, user_id: int) -> dict:
        user_posts = [post for post in self.posts if post['author_id'] == user_id]
        return {
            "success": True,
            "message": "User posts retrieved successfully",
            "data": user_posts
        }

    def get_user_followers(self, user_id: int) -> dict:
        user_followers = [follower for follower in self.followers if follower['followee_id'] == user_id]
        return {
            "success": True,
            "message": "User followers retrieved successfully",
            "data": user_followers
        }

    def get_user_following(self, user_id: int) -> dict:
        user_following = [follower for follower in self.followers if follower['follower_id'] == user_id]
        return {
            "success": True,
            "message": "User following retrieved successfully",
            "data": user_following
        }

    # Organization Account
    def create_organization(self, name: str, parent_id: int) -> dict:
        org = {
            "id": self._account_id,
            "name": name,
            "parent_id": parent_id
            # TODO: default parameters for other fields
        }
        self._account_id += 1
        self.organizations.append(org)
        return {
            "success": True,
            "message": "Organization created successfully",
            "data": org
        }

    def delete_organization(self, org_id: int) -> dict:
        for org in self.organizations:
            if org['id'] == org_id:
                self.organizations.remove(org)
                return {
                    "success": True,
                    "message": "Organization deleted successfully"
                }
        return {
            "success": False,
            "message": "Organization not found"
        }

    def update_organization(self, org_id: int, name: str) -> dict:
        for org in self.organizations:
            if org['id'] == org_id:
                org['name'] = name
                return {
                    "success": True,
                    "message": "Organization updated successfully"
                }
        return {
            "success": False,
            "message": "Organization not found"
        }

    def get_organization(self, org_id: int) -> dict:
        for org in self.organizations:
            if org['id'] == org_id:
                return {
                    "success": True,
                    "message": "Organization found",
                    "data": org
                }
        return {
            "success": False,
            "message": "Organization not found"
        }
    
    def get_child_organization_ids(self, org_id: int) -> 'list[int]':
        children = [org['id'] for org in self.organizations if org.get('parent_id') == org_id]
        all_children = []
        for child_id in children:
            all_children.append(child_id)
            all_children.extend(self.get_child_organization_ids(child_id))
        return all_children

    def get_organization_children(self, org_id: int) -> dict:
        child_ids = self.get_child_organization_ids(org_id)
        children = [org for org in self.organizations if org['id'] in child_ids]
        return {
            "success": True,
            "message": "Organization children retrieved successfully",
            "data": children
        }

    def get_organization_posts(self, org_id: int) -> dict:
        org_posts = [post for post in self.posts if post.get('author_id') == org_id]
        return {
            "success": True,
            "message": "Organization posts retrieved successfully",
            "data": org_posts
        }

    def get_organization_admins(self, org_id: int) -> dict:
        org_admins = [admin for admin in self.org_admins if admin['org_id'] == org_id]
        return {
            "success": True,
            "message": "Organization admins retrieved successfully",
            "data": org_admins
        }

    def get_organization_members(self, org_id: int) -> dict:
        org_members = [member for member in self.org_members if member['org_id'] == org_id]
        return {
            "success": True,
            "message": "Organization members retrieved successfully",
            "data": org_members
        }

    def get_organization_congregants(self, org_id: int) -> dict:
        org_congregants = [congregant for congregant in self.org_congregants if congregant['org_id'] == org_id]
        return {
            "success": True,
            "message": "Organization congregants retrieved successfully",
            "data": org_congregants
        }

    def get_organization_followers(self, org_id: int) -> dict:
        org_followers = [follower for follower in self.followers if follower['followee_id'] == org_id]
        return {
            "success": True,
            "message": "Organization followers retrieved successfully",
            "data": org_followers
        }

    def get_organization_following(self, org_id: int) -> dict:
        org_following = [following for following in self.followers if following['follower_id'] == org_id]
        return {
            "success": True,
            "message": "Organization following retrieved successfully",
            "data": org_following
        }
    
    # User/Organization Affiliation
    def add_organization_admin(self, org_id: int, user_id: int) -> dict:
        if any(admin for admin in self.org_admins if admin['org_id'] == org_id and admin['user_id'] == user_id):
            return {
                "success": True,
                "message": "User is already an admin of the organization"
            }
        self.org_admins.append({
            "org_id": org_id,
            "user_id": user_id
        })
        return {
            "success": True,
            "message": "User added as organization admin successfully"
        }
    
    def remove_organization_admin(self, org_id: int, user_id: int) -> dict:
        for admin in self.org_admins:
            if admin['org_id'] == org_id and admin['user_id'] == user_id:
                self.org_admins.remove(admin)
                return {
                    "success": True,
                    "message": "User removed from organization admins successfully"
                }
        return {
            "success": False,
            "message": "User is not an admin of the organization"
        }
    
    def add_organization_member(self, org_id: int, user_id: int) -> dict:
        if any(member for member in self.org_members if member['org_id'] == org_id and member['user_id'] == user_id):
            return {
                "success": True,
                "message": "User is already a member of the organization"
            }
        self.org_members.append({
            "org_id": org_id,
            "user_id": user_id
        })
        return {
            "success": True,
            "message": "User added as organization member successfully"
        }
    
    def remove_organization_member(self, org_id: int, user_id: int) -> dict:
        for member in self.org_members:
            if member['org_id'] == org_id and member['user_id'] == user_id:
                self.org_members.remove(member)
                return {
                    "success": True,
                    "message": "User removed from organization members successfully"
                }
        return {
            "success": False,
            "message": "User is not a member of the organization"
        }
    
    def add_organization_congregant(self, org_id: int, user_id: int) -> dict:
        if any(congregant for congregant in self.org_congregants if congregant['org_id'] == org_id and congregant['user_id'] == user_id):
            return {
                "success": True,
                "message": "User is already a congregant of the organization"
            }
        self.org_congregants.append({
            "org_id": org_id,
            "user_id": user_id
        })
        return {
            "success": True,
            "message": "User added as organization congregant successfully"
        }
    
    def remove_organization_congregant(self, org_id: int, user_id: int) -> dict:
        for congregant in self.org_congregants:
            if congregant['org_id'] == org_id and congregant['user_id'] == user_id:
                self.org_congregants.remove(congregant)
                return {
                    "success": True,
                    "message": "User removed from organization congregants successfully"
                }
        return {
            "success": False,
            "message": "User is not a congregant of the organization"
        }

    # Follow/Unfollow
    def follow(self, follower_id: int, followee_id: int) -> dict:
        self.followers.append({
            "follower_id": follower_id,
            "followee_id": followee_id
        })
        return {
            "success": True,
            "message": "Followed successfully"
        }

    def unfollow(self, follower_id: int, followee_id: int) -> dict:
        for follower in self.followers:
            if follower['follower_id'] == follower_id and follower['followee_id'] == followee_id:
                self.followers.remove(follower)
                return {
                    "success": True,
                    "message": "Unfollowed successfully"
                }
        return {
            "success": False,
            "message": "Follow relationship not found"
        }


    # Posts
    def create_post(self, author_id: int, caption: str, image_url: str,
                    location: str | None = None) -> dict:
        post = {
            "id": self._post_id,
            "author_id": author_id,
            "caption": caption,
            "image_url": image_url,
            "location": location,
            "type": "post"
        }
        self._post_id += 1
        self.posts.append(post)
        return {
            "success": True,
            "message": "Post created successfully",
            "id": post["id"]
        }

    def delete_post(self, post_id: int) -> dict:
        for post in self.posts:
            if post['id'] == post_id:
                self.posts.remove(post)
                return {
                    "success": True,
                    "message": "Post deleted successfully"
                }
        return {
            "success": False,
            "message": "Post not found"
        }

    def update_post(self, post_id: int, author_id: int, caption: str,
                    image_url: str, location: str | None = None) -> dict:
        for post in self.posts:
            if post['id'] == post_id:
                post['author_id'] = author_id
                post['caption'] = caption
                post['image_url'] = image_url
                post['location'] = location
                return {
                    "success": True,
                    "message": "Post updated successfully"
                }
        return {
            "success": False,
            "message": "Post not found"
        }

    def get_post(self, post_id: int) -> dict:
        for post in self.posts:
            if post['id'] == post_id:
                return {
                    "success": True,
                    "message": "Post found",
                    "data": post
                }
        return {
            "success": False,
            "message": "Post not found"
        }

    # Events
    def create_event(self, author_id: int, title: str, description: str,
                     start_time: str, end_time: str, location: str) -> dict:
        event = {
            "id": self._post_id,
            "author_id": author_id,
            "title": title,
            "description": description,
            "start_time": start_time,
            "end_time": end_time,
            "location": location,
            "type": "event"
        }
        self._post_id += 1
        self.events.append(event)
        return {
            "success": True,
            "message": "Event created successfully",
            "id": event["id"]
        }

    def delete_event(self, event_id: int) -> dict:
        for event in self.events:
            if event['id'] == event_id:
                self.events.remove(event)
                return {
                    "success": True,
                    "message": "Event deleted successfully"
                }
        return {
            "success": False,
            "message": "Event not found"
        }

    def update_event(self, event_id: int, author_id: int, title: str, description: str,
                     start_time: str, end_time: str, location: str) -> dict:
        for event in self.events:
            if event['id'] == event_id:
                event['author_id'] = author_id
                event['title'] = title
                event['description'] = description
                event['start_time'] = start_time
                event['end_time'] = end_time
                event['location'] = location
                return {
                    "success": True,
                    "message": "Event updated successfully"
                }
        return {
            "success": False,
            "message": "Event not found"
        }

    def get_event(self, event_id: int) -> dict:
        for event in self.events:
            if event['id'] == event_id:
                return {
                    "success": True,
                    "message": "Event found",
                    "data": event
                }
        return {
            "success": False,
            "message": "Event not found"
        }

    # Events Going/Interested
    def going_event(self, event_id: int, user_id: int) -> dict:
        for entry in self.interested_events:
            if entry["event_id"] == event_id and entry["user_id"] == user_id:
                return {
                    "success": False,
                    "message": "User already marked as interested in the event"
                }
        for entry in self.going_events:
            if entry["event_id"] == event_id and entry["user_id"] == user_id:
                return {
                    "success": True,
                    "message": "User already marked as going to the event"
                }
        self.going_events.append({
            "event_id": event_id,
            "user_id": user_id
        })
        return {
            "success": True,
            "message": "User marked as going to the event"
        }

    def remove_going_event(self, event_id: int, user_id: int) -> dict:
        for entry in self.going_events:
            if entry["event_id"] == event_id and entry["user_id"] == user_id:
                self.going_events.remove(entry)
                return {
                    "success": True,
                    "message": "User removed from going to the event"
                }
        return {
            "success": True,
            "message": "User not marked as going to the event"
        }

    def interested_event(self, event_id: int, user_id: int) -> dict:
        for entry in self.going_events:
            if entry["event_id"] == event_id and entry["user_id"] == user_id:
                return {
                    "success": False,
                    "message": "User already marked as going to the event"
                }
        for entry in self.interested_events:
            if entry["event_id"] == event_id and entry["user_id"] == user_id:
                return {
                    "success": True,
                    "message": "User already marked as interested in the event"
                }
        self.interested_events.append({
            "event_id": event_id,
            "user_id": user_id
        })
        return {
            "success": True,
            "message": "User marked as interested in the event"
        }

    def remove_interested_event(self, event_id: int, user_id: int) -> dict:
        for entry in self.interested_events:
            if entry["event_id"] == event_id and entry["user_id"] == user_id:
                self.interested_events.remove(entry)
                return {
                    "success": True,
                    "message": "User removed from interested in the event"
                }
        return {
            "success": True,
            "message": "User not marked as interested in the event"
        }

    # Post/Event Comments
    def create_comment(self, post_id: int, parent_id: int, author_id: int, content: str) -> dict:
        comment = {
            "id": len(self.comments) + 1,
            "post_id": post_id,
            "parent_id": parent_id,
            "author_id": author_id,
            "content": content
        }
        self.comments.append(comment)
        return {
            "success": True,
            "message": "Comment created successfully",
            "id": comment["id"],
            "data": self.get_comment(comment["id"])["data"]
        }

    def delete_comment(self, comment_id: int) -> dict:
        for comment in self.comments:
            if comment["id"] == comment_id:
                self.comments.remove(comment)
                return {
                    "success": True,
                    "message": "Comment deleted successfully"
                }
        return {
            "success": False,
            "message": "Comment not found"
        }

    def update_comment(self, comment_id: int, content: str) -> dict:
        for comment in self.comments:
            if comment["id"] == comment_id:
                comment["content"] = content
                return {
                    "success": True,
                    "message": "Comment updated successfully"
                }
        return {
            "success": False,
            "message": "Comment not found"
        }

    def get_comment(self, comment_id: int) -> dict:
        for comment in self.comments:
            if comment["id"] == comment_id:
                comment['author_name'], comment['author_pfp'] = self._get_user_name_pfp(comment['author_id'])
                like_user_ids = [x['user_id'] for x in self.likes if x['post_id'] == comment['post_id']]
                dislike_user_ids = [x['user_id'] for x in self.dislikes if x['post_id'] == comment['post_id']]
                comment['like_count'] = len(like_user_ids)
                comment['dislike_count'] = len(dislike_user_ids)
                comment['user_liked'] = comment['author_id'] in like_user_ids
                comment['user_disliked'] = comment['author_id'] in dislike_user_ids
                comment['reply_count'] = len([x for x in self.comments if x['parent_id'] == comment['id']])
                return {
                    "success": True,
                    "data": comment
                }
        return {
            "success": False,
            "message": "Comment not found"
        }

    # Posts Like/Dislike
    def like(self, post_id: int, user_id: int) -> dict:
        for entry in self.dislikes:
            if entry["post_id"] == post_id and entry["user_id"] == user_id:
                return {
                    "success": False,
                    "message": "User already disliked the post"
                }
        for entry in self.likes:
            if entry["post_id"] == post_id and entry["user_id"] == user_id:
                return {
                    "success": True,
                    "message": "User already liked the post"
                }
        self.likes.append({
            "post_id": post_id,
            "user_id": user_id
        })
        return {
            "success": True,
            "message": "User liked the post"
        }

    def remove_like(self, post_id: int, user_id: int) -> dict:
        for entry in self.likes:
            if entry["post_id"] == post_id and entry["user_id"] == user_id:
                self.likes.remove(entry)
                return {
                    "success": True,
                    "message": "User removed like from the post"
                }
        return {
            "success": True,
            "message": "User not liked the post"
        }

    def dislike(self, post_id: int, user_id: int) -> dict:
        for entry in self.likes:
            if entry["post_id"] == post_id and entry["user_id"] == user_id:
                return {
                    "success": False,
                    "message": "User already liked the post"
                }
        for entry in self.dislikes:
            if entry["post_id"] == post_id and entry["user_id"] == user_id:
                return {
                    "success": True,
                    "message": "User already disliked the post"
                }
        self.dislikes.append({
            "post_id": post_id,
            "user_id": user_id
        })
        return {
            "success": True,
            "message": "User disliked the post"
        }

    def remove_dislike(self, post_id: int, user_id: int) -> dict:
        for entry in self.dislikes:
            if entry["post_id"] == post_id and entry["user_id"] == user_id:
                self.dislikes.remove(entry)
                return {
                    "success": True,
                    "message": "User removed dislike from the post"
                }
        return {
            "success": True,
            "message": "User not disliked the post"
        }
    
    # Post/Event Feed
    def _get_user_name_pfp(self, user_id: int) -> tuple[str, str]:
        """ Returns username and profile picture url - INTERNAL USE ONLY """
        for user in self.users:
            if user['id'] == user_id:
                return user['username'], user.get('pfp_url', '')
        return "Unknown User", ""
    
    def get_user_name(self, user_id:int):
        for user in self.users:
            if user['id'] == user_id:
                return {
                    "success": True,
                    "message": "Successfully fetched user name",
                    "data": user["username"]
                }
        return {
            "success": False,
            "message": "Failed to fetch user name - id does not exist"
        }
    
    def get_comments(self, user_id: int, post_id: int, offset: int = 0, limit: int = 10) -> dict:
        comments = [comment for comment in self.comments if comment['post_id'] == post_id and comment['parent_id'] == 0]
        comments = comments[offset:offset + limit]
        for comment in comments:
            comment['author_name'], comment['author_pfp'] = self._get_user_name_pfp(comment['author_id'])
            like_user_ids = [x['user_id'] for x in self.likes if x['post_id'] == post_id]
            dislike_user_ids = [x['user_id'] for x in self.dislikes if x['post_id'] == post_id]
            comment['like_count'] = len(like_user_ids)
            comment['dislike_count'] = len(dislike_user_ids)
            comment['user_liked'] = user_id in like_user_ids
            comment['user_disliked'] = user_id in dislike_user_ids
            comment['reply_count'] = len([x for x in self.comments if x['parent_id'] == comment['id']])
        return {
            "success": True,
            "message": "Comments retrieved successfully",
            "data": comments
        }
    
    def get_replies(self, user_id: int, comment_id: int, offset: int = 0, limit: int = 10) -> dict:
        replies = [reply for reply in self.comments if reply['parent_id'] == comment_id]
        replies = replies[offset:offset + limit]
        for reply in replies:
            reply['author_name'], reply['author_pfp'] = self._get_user_name_pfp(reply['author_id'])
            like_user_ids = [x['user_id'] for x in self.likes if x['post_id'] == reply['post_id']]
            dislike_user_ids = [x['user_id'] for x in self.dislikes if x['post_id'] == reply['post_id']]
            reply['like_count'] = len(like_user_ids)
            reply['dislike_count'] = len(dislike_user_ids)
            reply['user_liked'] = user_id in like_user_ids
            reply['user_disliked'] = user_id in dislike_user_ids
            reply['reply_count'] = len([x for x in self.comments if x['parent_id'] == reply['id']])
        return {
            "success": True,
            "message": "Replies retrieved successfully",
            "data": replies
        }

    def get_user_feed(self, user_id: int, offset: int = 0, limit: int = 10) -> dict:
        feed = (self.posts + self.events)[offset:offset + limit]
        for item in feed:
            item['author_name'], item['author_pfp'] = self._get_user_name_pfp(item['author_id'])
            like_user_ids = [x['user_id'] for x in self.likes if x['post_id'] == item['id']]
            dislike_user_ids = [x['user_id'] for x in self.dislikes if x['post_id'] == item['id']]
            item['like_count'] = len(like_user_ids)
            item['dislike_count'] = len(dislike_user_ids)
            item['user_liked'] = user_id in like_user_ids
            item['user_disliked'] = user_id in dislike_user_ids
            item['comment_count'] = len([x for x in self.comments if x['post_id'] == item['id'] and x['parent_id'] == 0])
            item['comments'] = self.get_comments(user_id, item['id'], 0, 2)['data'] if item['type'] == 'post' else []
            if item['type'] == 'event':
                going_user_ids = [x['user_id'] for x in self.going_events if x['event_id'] == item['id']]
                interested_user_ids = [x['user_id'] for x in self.interested_events if x['event_id'] == item['id']]
                item['going_count'] = len(going_user_ids)
                item['interested_count'] = len(interested_user_ids)
                item['user_going'] = user_id in going_user_ids
                item['user_interested'] = user_id in interested_user_ids
        return {
            "success": True,
            "message": "User feed retrieved successfully",
            "data": feed
        }

    # Search
    def search(self, query: str, include_posts: bool, include_events: bool,
               include_organizations: bool, include_users: bool) -> dict:
        results = {
            "users": [user for user in self.users if query.lower() in user.get("username", "").lower()],
            "organizations": [org for org in self.organizations if org.get('parent_id') == 0 and query.lower() in org.get("name", "").lower()]
        }
        return {
            "success": True,
            "message": "Search completed",
            "data": results
        }

    def search_organizations(self, query: str) -> dict:
        results = [org for org in self.organizations if org.get('parent_id') == 0 and query.lower() in org.get("name", "").lower()]
        return {
            "success": True,
            "message": "Organizations search completed",
            "data": results
        }

    def search_events(self, query: str) -> dict:
        results = [event for event in self.events if query.lower() in event.get("name", "").lower()]
        return {
            "success": True,
            "message": "Events search completed",
            "data": results
        }
