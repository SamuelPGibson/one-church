'''
Database models for use in PostgreSQLDatabase
'''

from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

# Each class is a table - each attribute is a column

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
