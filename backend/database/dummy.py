'''
Dummy database module for testing
'''

from .database import Database

class DummyDatabase(Database):
    ''' Dummy database implementation for testing only
    '''
    def get_test(self) -> dict:
        return {"message": "Connected to Dummy Database"}
