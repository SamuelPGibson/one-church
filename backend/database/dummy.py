'''
Dummy database module for testing
'''

from .database import Database

class DummyDatabase(Database):
    ''' Dummy database implementation for testing only
    '''
    def get_test(self) -> dict:
        return {"message": "Connected to Dummy Database"}
    
    def get_int_test(self, int_value: int) -> dict:
        return {"int_value": int_value, "message": f"Received integer value {int_value}"}

    
    # Login and Logout
    def authenticate_user(self, username: str, password: str) -> dict:
        pass

    def logout_user(self, user_id: int) -> dict:
        pass

    # User Account
    def create_user(self, username: str, password: str) -> dict:
        pass

    def delete_user(self, user_id: int) -> dict:
        pass

    def user_change_password(self, user_id: int, new_password: str) -> dict:
        pass

    def update_user(self, user_id: int, user_info: dict) -> dict:
        pass

    def get_user(self, user_id: int) -> dict:
        pass

    def get_user_organizations_admin(self, user_id: int) -> dict:
        pass

    def get_user_organizations_member(self, user_id: int) -> dict:
        pass

    def get_user_organizations_congregant(self, user_id: int) -> dict:
        pass

    def get_user_posts(self, user_id: int) -> dict:
        pass

    def get_user_followers(self, user_id: int) -> dict:
        pass

    def get_user_following(self, user_id: int) -> dict:
        pass

    # Organization Account
    def create_organization(self, name: str, parent_id: int) -> dict:
        pass

    def delete_organization(self, org_id: int) -> dict:
        pass

    def update_organization(self, org_id: int, org_info: dict) -> dict:
        pass

    def get_organization(self, org_id: int) -> dict:
        pass

    def get_organization_children(self, org_id: int) -> dict:
        pass

    def get_organization_posts(self, org_id: int) -> dict:
        pass

    def get_organization_admins(self, org_id: int) -> dict:
        pass

    def get_organization_members(self, org_id: int) -> dict:
        pass

    def get_organization_congregants(self, org_id: int) -> dict:
        pass

    def get_organization_followers(self, org_id: int) -> dict:
        pass

    def get_organization_following(self, org_id: int) -> dict:
        pass

    # Follow/Unfollow
    def follow(self, follower_id: int, followee_id: int) -> dict:
        pass

    def unfollow(self, follower_id: int, followee_id: int) -> dict:
        pass


    # Posts
    def create_post(self, author_id: int, caption: str, image_url: str,
                    location: str | None = None) -> dict:
        pass

    def delete_post(self, post_id: int) -> dict:
        pass

    def update_post(self, post_id: int, post_info: dict) -> dict:
        pass

    def get_post(self, post_id: int) -> dict:
        pass

    # Events
    def create_event(self, author_id: int, title: str, description: str,
                     start_time: str, end_time: str, location: str) -> dict:
        pass

    def delete_event(self, event_id: int) -> dict:
        pass
        
    def update_event(self, event_id: int, event_info: dict) -> dict:
        pass

    def get_event(self, event_id: int) -> dict:
        pass

    # Events Going/Interested
    def going_event(self, event_id: int, user_id: int) -> dict:
        pass

    def remove_going_event(self, event_id: int, user_id: int) -> dict:
        pass

    def interested_event(self, event_id: int, user_id: int) -> dict:
        pass

    def remove_interested_event(self, event_id: int, user_id: int) -> dict:
        pass

    # Post/Event Comments
    def create_comment(self, post_id: int, author_id: int, content: str) -> dict:
        pass

    def delete_comment(self, comment_id: int) -> dict:
        pass

    def update_comment(self, comment_id: int, comment_info: dict) -> dict:
        pass

    def get_comment(self, comment_id: int) -> dict:
        pass

    # Posts Like/Dislike
    def like(self, post_id: int, user_id: int) -> dict:
        pass

    def remove_like(self, post_id: int, user_id: int) -> dict:
        pass

    def dislike(self, post_id: int, user_id: int) -> dict:
        pass

    def remove_dislike(self, post_id: int, user_id: int) -> dict:
        pass

    # Search
    def search(self, query: str) -> dict:
        pass

    def search_organizations(self, query: str) -> dict:
        pass

    def search_events(self, query: str) -> dict:
        pass
