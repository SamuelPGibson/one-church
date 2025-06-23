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
