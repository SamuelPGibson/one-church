'''
Base database interface
'''

from abc import ABC, abstractmethod

class Database(ABC):
    ''' Base abstract database class
    
        Defines all methods to be implemented by specific database implementations
    '''
    @abstractmethod
    def get_test(self) -> str:
        ''' Returns a test string for the database
        '''

    @abstractmethod
    def authenticate_user(self, username: str, password: str) -> bool:
        '''
        Purpose:
            Authenticate a user with the given username and password.
        Pre-conditions:
            :param username: The username of the user
            :param password: The password of the user
        Post-conditions:
            (none)
        Returns:
            :return: bool: True if authentication is successful, False otherwise
        '''

    @abstractmethod
    def get_user(self, user_id: int):
        '''
        Purpose:
            Retrieve a user by their ID.
        Pre-conditions:
            :param user_id: The ID of the user to retrieve
        Post-conditions:
            (none)
        Returns:
            :return: User object corresponding to the given user_id
        '''
