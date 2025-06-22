'''
Mapping URLs to backend functions
'''

from django.urls import path
from . import views

urlpatterns = [
    path('test/', views.get_test),
    path('posts/<int:post_id>/', views.get_post),
    path('posts/', views.create_post),
]
