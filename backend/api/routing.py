'''
Websocket routing
'''

from django.urls import re_path
from .consumers import CommentConsumer, ReplyConsumer, MessageConsumer

websocket_urlpatterns = [
    # Comment stream: connect to a group for each post (e.g., post_42)
    re_path(r"ws/comments/(?P<post_id>\d+)/$", CommentConsumer.as_asgi()),

    # Reply stream: connect to a group for each parent comment (e.g., reply_105)
    re_path(r"ws/replies/(?P<parent_id>\d+)/$", ReplyConsumer.as_asgi()),

    # Message stream: connect to a group for each chat (e.g., chat_42)
    re_path(r"ws/chat/(?P<chat_id>\d+)/$", MessageConsumer.as_asgi()),
]
