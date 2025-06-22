'''
Dummy database module for testing
'''

from .database import Database

class DummyDatabase(Database):
    ''' Dummy database implementation for testing only
    '''
    def get_test(self) -> str:
        return {"message": "Connected to Dummy Database"}
