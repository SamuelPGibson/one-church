'''
Base database interface
'''

from abc import ABC, abstractmethod

class Database(ABC):
    ''' Base abstract database class
    
        Defines all methods to be implemented by specific database implementations

        All methods return a dictionary with keys 'success' and 'message'
        and possibly additional fields with relevant data.
    '''
    @abstractmethod
    def get_test(self) -> dict:
        ''' Returns a test string for the database '''

    # Login and Logout
    @abstractmethod
    def authenticate_user(self, username: str, password: str) -> dict:
        '''
        Purpose:
            Authenticate a user with the given username and password.
        Pre-conditions:
            :param username: The username of the user
            :param password: The password of the user
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the authentication
                              with keys 'success' and 'message'.
                              'success' is True if authentication is successful, otherwise False.
                              'id' is the ID of the authenticated user if successful.
                              'message' contains additional information about the result.
        '''

    @abstractmethod
    def logout_user(self, user_id: int) -> dict:
        '''
        Purpose:
            Log out a user by their ID.
        Pre-conditions:
            :param user_id: The ID of the user to log out
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the logout operation
                              with keys 'success' and 'message'.
                              'success' is True if logout is successful, otherwise False.
                              'message' contains additional information about the result.
        '''

    # User Account
    @abstractmethod
    def create_user(self, username: str, password: str) -> dict:
        '''
        Purpose:
            Create a new user account with the given username and password.
        Pre-conditions:
            :param username: The desired username for the new user
            :param password: The desired password for the new user
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the user creation
                            with keys 'success', 'id' and 'message'.
                            'success' is True if user creation is successful, otherwise False.
                            'id' is the ID of the newly created user if successful.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def delete_user(self, user_id: int) -> dict:
        '''
        Purpose:
            Delete a user account by their ID.
        Pre-conditions:
            :param user_id: The ID of the user to delete
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the deletion operation
                            with keys 'success' and 'message'.
                            'success' is True if deletion is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def user_change_password(self, user_id: int, new_password: str) -> dict:
        '''
        Purpose:
            Change the password of a user by their ID.
        Pre-conditions:
            :param user_id: The ID of the user whose password is to be changed
            :param new_password: The new password for the user
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the password change
                            with keys 'success' and 'message'.
                            'success' is True if password change is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def update_user(self, user_id: int, user_info: dict) -> dict:
        '''
        Purpose:
            Update user information for a given user ID.
        Pre-conditions:
            :param user_id: The ID of the user to update
            :param user_info: A dictionary containing the new user information
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the update operation
                            with keys 'success' and 'message'.
                            'success' is True if update is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def get_user(self, user_id: int) -> dict:
        '''
        Purpose:
            Retrieve a user by their ID.
        Pre-conditions:
            :param user_id: The ID of the user to retrieve
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the user information
                            with keys 'success' and 'data'.
                            'success' is True if user retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the user information if successful.
        '''

    @abstractmethod
    def get_user_organizations_admin(self, user_id: int) -> dict:
        '''
        Purpose:
            Retrieve all organizations where the user is an admin.
        Pre-conditions:
            :param user_id: The ID of the user whose organizations are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of organizations if successful.
        '''

    @abstractmethod
    def get_user_organizations_member(self, user_id: int) -> dict:
        '''
        Purpose:
            Retrieve all organizations where the user is a member.
        Pre-conditions:
            :param user_id: The ID of the user whose organizations are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of organizations if successful.
        '''

    @abstractmethod
    def get_user_organizations_congregant(self, user_id: int) -> dict:
        '''
        Purpose:
            Retrieve all organizations where the user is a congregant.
        Pre-conditions:
            :param user_id: The ID of the user whose organizations are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of organizations if successful.
        '''

    @abstractmethod
    def get_user_posts(self, user_id: int) -> dict:
        '''
        Purpose:
            Retrieve all posts made by a user by their ID.
        Pre-conditions:
            :param user_id: The ID of the user whose posts are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of posts if successful.
        '''

    @abstractmethod
    def get_user_followers(self, user_id: int) -> dict:
        '''
        Purpose:
            Retrieve all followers of a user by their ID.
        Pre-conditions:
            :param user_id: The ID of the user whose followers are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of followers if successful.
        '''

    @abstractmethod
    def get_user_following(self, user_id: int) -> dict:
        '''
        Purpose:
            Retrieve all users or organizations that a user is following by their ID.
        Pre-conditions:
            :param user_id: The ID of the user whose following list is to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of followed users or organizations if successful.
        '''

    # Organization Account
    @abstractmethod
    def create_organization(self, name: str, parent_id: int) -> dict:
        '''
        Purpose:
            Create a new organization with the given name and description.
        Pre-conditions:
            :param name: The name of the organization
            :param parent_id: The ID of the parent organization (if any)
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the organization creation
                            with keys 'success', 'id' and 'message'.
                            'success' is True if organization creation is successful, otherwise False.
                            'id' is the ID of the newly created organization if successful.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def delete_organization(self, org_id: int) -> dict:
        '''
        Purpose:
            Delete an organization by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization to delete
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the deletion operation
                            with keys 'success' and 'message'.
                            'success' is True if deletion is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def update_organization(self, org_id: int, org_info: dict) -> dict:
        '''
        Purpose:
            Update organization information for a given organization ID.
            Checks to make sure parent organization has not been changed.
        Pre-conditions:
            :param org_id: The ID of the organization to update
            :param org_info: A dictionary containing the new organization information
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the update operation
                            with keys 'success' and 'message'.
                            'success' is True if update is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def get_organization(self, org_id: int) -> dict:
        '''
        Purpose:
            Retrieve an organization by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization to retrieve
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the organization information
                            with keys 'success' and 'data'.
                            'success' is True if organization retrieval is successful, otherwise False.
                            'data' contains the organization information if successful.
        '''

    @abstractmethod
    def get_organization_children(self, org_id: int) -> dict:
        '''
        Purpose:
            Retrieve all child organizations of a given organization by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization whose children are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of child organizations if successful.
        '''

    @abstractmethod
    def get_organization_posts(self, org_id: int) -> dict:
        '''
        Purpose:
            Retrieve all posts made by an organization by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization whose posts are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of posts if successful.
        '''

    @abstractmethod
    def get_organization_admins(self, org_id: int) -> dict:
        '''
        Purpose:
            Retrieve all admins of an organization by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization whose admins are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of admins if successful.
        '''

    @abstractmethod
    def get_organization_members(self, org_id: int) -> dict:
        '''
        Purpose:
            Retrieve all members of an organization by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization whose members are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of members if successful.
        '''

    @abstractmethod
    def get_organization_congregants(self, org_id: int) -> dict:
        '''
        Purpose:
            Retrieve all congregants of an organization by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization whose congregants are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of congregants if successful.
        '''

    @abstractmethod
    def get_organization_followers(self, org_id: int) -> dict:
        '''
        Purpose:
            Retrieve all followers of an organization by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization whose followers are to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of followers if successful.
        '''

    @abstractmethod
    def get_organization_following(self, org_id: int) -> dict:
        '''
        Purpose:
            Retrieve all users or organizations that an organization is following by its ID.
        Pre-conditions:
            :param org_id: The ID of the organization whose following list is to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the retrieval operation
                            with keys 'success' and 'data'.
                            'success' is True if retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the list of followed users or organizations if successful.
        '''

    # Follow/Unfollow
    @abstractmethod
    def follow(self, follower_id: int, followee_id: int) -> dict:
        '''
        Purpose:
            A user or organization follows another user or organization.
        Pre-conditions:
            :param follower_id: The ID of the user or organization that is following
            :param followee_id: The ID of the user or organization to follow
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the follow operation
                            with keys 'success' and 'message'.
                            'success' is True if follow operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def unfollow(self, follower_id: int, followee_id: int) -> dict:
        '''
        Purpose:
            A user or organization unfollows another user or organization.
        Pre-conditions:
            :param follower_id: The ID of the user or organization that is unfollowing
            :param followee_id: The ID of the user or organization to unfollow
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the unfollow operation
                            with keys 'success' and 'message'.
                            'success' is True if unfollow operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''


    # Posts
    @abstractmethod
    def create_post(self, author_id: int, caption: str, image_url: str,
                    location: str | None = None) -> dict:
        '''
        Purpose:
            Create a new post.
        Pre-conditions:
            :param author_id: The ID of the user or organization creating the post
            :param caption: The caption for the post
            :param image_url: The URL of the image to be included in the post
            :param location: The location associated with the post (optional)
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the post creation operation
                            with keys 'success' and 'message'.
                            'success' is True if post creation is successful, otherwise False.
                            'id' is the ID of the newly created post if successful.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def delete_post(self, post_id: int) -> dict:
        '''
        Purpose:
            Delete a post by its ID.
        Pre-conditions:
            :param post_id: The ID of the post to be deleted
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the post deletion operation
                            with keys 'success' and 'message'.
                            'success' is True if post deletion is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def update_post(self, post_id: int, post_info: dict) -> dict:
        '''
        Purpose:
            Update a post by its ID.
        Pre-conditions:
            :param post_id: The ID of the post to be updated
            :param post_info: A dictionary containing the new post information
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the post update operation
                            with keys 'success' and 'message'.
                            'success' is True if post update is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def get_post(self, post_id: int) -> dict:
        '''
        Purpose:
            Retrieve a post by its ID.
        Pre-conditions:
            :param post_id: The ID of the post to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the post information
                            with keys 'success' and 'data'.
                            'success' is True if post retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the post information if successful.
        '''

    # Events
    @abstractmethod
    def create_event(self, author_id: int, title: str, description: str,
                     start_time: str, end_time: str, location: str) -> dict:
        '''
        Purpose:
            Create a new event.
        Pre-conditions:
            :param author_id: The ID of the user or organization creating the event
            :param title: The title of the event
            :param description: The description of the event
            :param start_time: The start time of the event in ISO format
            :param end_time: The end time of the event in ISO format
            :param location: The location of the event
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the event creation operation
                            with keys 'success' and 'message'.
                            'success' is True if event creation is successful, otherwise False.
                            'id' is the ID of the newly created event if successful.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def delete_event(self, event_id: int) -> dict:
        '''
        Purpose:
            Delete an event by its ID.
        Pre-conditions:
            :param event_id: The ID of the event to be deleted
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the event deletion operation
                            with keys 'success' and 'message'.
                            'success' is True if event deletion is successful, otherwise False.
                            'message' contains additional information about the result.
        '''
        
    @abstractmethod
    def update_event(self, event_id: int, event_info: dict) -> dict:
        '''
        Purpose:
            Update an event by its ID.
        Pre-conditions:
            :param event_id: The ID of the event to be updated
            :param event_info: A dictionary containing the new event information
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the event update operation
                            with keys 'success' and 'message'.
                            'success' is True if event update is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def get_event(self, event_id: int) -> dict:
        '''
        Purpose:
            Retrieve an event by its ID.
        Pre-conditions:
            :param event_id: The ID of the event to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the event information
                            with keys 'success' and 'data'.
                            'success' is True if event retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the event information if successful.
        '''

    # Events Going/Interested
    @abstractmethod
    def going_event(self, event_id: int, user_id: int) -> dict:
        '''
        Purpose:
            Mark a user as going to an event.
            Idempotent if the user has already marked as going.
            Fails if the user has marked as interested.
        Pre-conditions:
            :param event_id: The ID of the event to mark as going
            :param user_id: The ID of the user who is marking as going
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the going operation
                            with keys 'success' and 'message'.
                            'success' is True if the going operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def remove_going_event(self, event_id: int, user_id: int) -> dict:
        '''
        Purpose:
            Remove a user from the going list of an event.
            Idempotent if the user has not marked as going.
        Pre-conditions:
            :param event_id: The ID of the event to remove the going mark from
            :param user_id: The ID of the user who is removing the going mark
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the remove going operation
                            with keys 'success' and 'message'.
                            'success' is True if the remove going operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def interested_event(self, event_id: int, user_id: int) -> dict:
        '''
        Purpose:
            Mark a user as interested in an event.
            Idempotent if the user has already marked as interested.
            Fails if the user has marked as going.
        Pre-conditions:
            :param event_id: The ID of the event to mark as interested
            :param user_id: The ID of the user who is marking as interested
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the interested operation
                            with keys 'success' and 'message'.
                            'success' is True if the interested operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def remove_interested_event(self, event_id: int, user_id: int) -> dict:
        '''
        Purpose:
            Remove a user from the interested list of an event.
            Idempotent if the user has not marked as interested.
        Pre-conditions:
            :param event_id: The ID of the event to remove the interested mark from
            :param user_id: The ID of the user who is removing the interested mark
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the remove interested operation
                            with keys 'success' and 'message'.
                            'success' is True if the remove interested operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    # Post/Event Comments
    @abstractmethod
    def create_comment(self, post_id: int, author_id: int, content: str) -> dict:
        '''
        Purpose:
            Create a new comment on a post or event.
        Pre-conditions:
            :param post_id: The ID of the post or event to comment on
            :param author_id: The ID of the user creating the comment
            :param content: The content of the comment
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the comment creation operation
                            with keys 'success' and 'message'.
                            'success' is True if comment creation is successful, otherwise False.
                            'id' is the ID of the newly created comment if successful.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def delete_comment(self, comment_id: int) -> dict:
        '''
        Purpose:
            Delete a comment by its ID.
        Pre-conditions:
            :param comment_id: The ID of the comment to be deleted
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the comment deletion operation
                            with keys 'success' and 'message'.
                            'success' is True if comment deletion is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def update_comment(self, comment_id: int, comment_info: dict) -> dict:
        '''
        Purpose:
            Update a comment by its ID.
        Pre-conditions:
            :param comment_id: The ID of the comment to be updated
            :param comment_info: A dictionary containing the new comment information
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the comment update operation
                            with keys 'success' and 'message'.
                            'success' is True if comment update is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def get_comment(self, comment_id: int) -> dict:
        '''
        Purpose:
            Retrieve a comment by its ID.
        Pre-conditions:
            :param comment_id: The ID of the comment to be retrieved
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the comment information
                            with keys 'success' and 'data'.
                            'success' is True if comment retrieval is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the comment information if successful.
        '''

    # Posts Like/Dislike
    @abstractmethod
    def like(self, post_id: int, user_id: int) -> dict:
        '''
        Purpose:
            Like a post by its ID.
            Idempotent if the user has already liked the post.
            Fails if the user has disliked the post.
        Pre-conditions:
            :param post_id: The ID of the post to be liked
            :param user_id: The ID of the user who is liking the post
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the like operation
                            with keys 'success' and 'message'.
                            'success' is True if the like operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def remove_like(self, post_id: int, user_id: int) -> dict:
        '''
        Purpose:
            Remove a like from a post by its ID.
            Idempotent if the user has not liked the post.
        Pre-conditions:
            :param post_id: The ID of the post to remove the like from
            :param user_id: The ID of the user who is removing the like
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the remove like operation
                            with keys 'success' and 'message'.
                            'success' is True if the remove like operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def dislike(self, post_id: int, user_id: int) -> dict:
        '''
        Purpose:
            Dislike a post by its ID.
            Idempotent if the user has already disliked the post.

        Pre-conditions:
            :param post_id: The ID of the post to be disliked
            :param user_id: The ID of the user who is disliking the post
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the dislike operation
                            with keys 'success' and 'message'.
                            'success' is True if the dislike operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    @abstractmethod
    def remove_dislike(self, post_id: int, user_id: int) -> dict:
        '''
        Purpose:
            Remove a dislike from a post by its ID.
            Idempotent if the user has not disliked the post.
        Pre-conditions:
            :param post_id: The ID of the post to remove the dislike from
            :param user_id: The ID of the user who is removing the dislike
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the result of the remove dislike operation
                            with keys 'success' and 'message'.
                            'success' is True if the remove dislike operation is successful, otherwise False.
                            'message' contains additional information about the result.
        '''

    # Search
    @abstractmethod
    def search(self, query: str) -> dict:
        '''
        Purpose:
            Search for users and organizations based on a query string.
        Pre-conditions:
            :param query: The search query string
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the search results
                            with keys 'success' and 'data'.
                            'success' is True if search is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the search results if successful.
        '''

    @abstractmethod
    def search_organizations(self, query: str) -> dict:
        '''
        Purpose:
            Search for organizations based on a query string.
        Pre-conditions:
            :param query: The search query string
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the search results
                            with keys 'success' and 'data'.
                            'success' is True if search is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the search results if successful.
        '''

    @abstractmethod
    def search_events(self, query: str) -> dict:
        '''
        Purpose:
            Search for events based on a query string.
        Pre-conditions:
            :param query: The search query string
        Post-conditions:
            (none)
        Returns:
            :return: dict: A dictionary containing the search results
                            with keys 'success' and 'data'.
                            'success' is True if search is successful, otherwise False.
                            'message' contains additional information about the result.
                            'data' contains the search results if successful.
        '''
