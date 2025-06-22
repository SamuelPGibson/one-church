'''
PostgreSQL database implementation
'''

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from api.models import Post

from .database import Database

class PostgreSQLDatabase(Database):
    ''' PostgreSQL database implementation
    '''
    def __init__(self):
        ''' Initialize the PostgreSQL database connection '''

    def get_test(self) -> str:
        return {"message": "Connected to PostgreSQL Database"}

    def authenticate_user(self, username: str, password: str) -> bool:
        return authenticate(username=username, password=password)

    def get_user(self, user_id):
        return User.objects.get(id=user_id)

    def register_user(self, data):
        user = User.objects.create_user(
            username=data['username'],
            email=data.get('email'),
            password=data['password']
        )
        return user

    def create_post(self, user_id, content, image=None):
        return Post.objects.create(author_id=user_id, content=content, image=image)

    def list_posts(self):
        return Post.objects.all().order_by('-created_at')
