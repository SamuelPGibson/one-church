'''
Functions for handling API requests
'''

# Django endpoints
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

# Websocket
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

from typing import Any
import json

from database import Database, DummyDatabase, PostgreSQLDatabase

# for presigned urls
import boto3

# env 
from dotenv import load_dotenv
import os

load_dotenv()

# db: Database = PostgreSQLDatabase()
db: Database = DummyDatabase()  # Use DummyDatabase for testing

# Helper Functions
def get_status_code(result: dict) -> int:
    ''' returns status code base on "success" key in result '''
    return 200 if result.get("success") else 401

# Test Endpoints
def get_test(request: HttpRequest) -> JsonResponse:
    if request.method == "GET":
        return JsonResponse(db.get_test())
    
def get_int_test(request: HttpRequest, int_value: int) -> JsonResponse:
    if request.method == "GET":
        return JsonResponse(db.get_int_test(int_value))

# Login and Logout
def authenticate_user(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        print("Authenticating user: ", request.body)
        try:
            data = json.loads(request.body)
            result = db.authenticate_user(data["username"], data["password"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def logout_user(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.logout_user(data["user_id"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

# User Account
def create_user(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.create_user(data)
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def delete_user(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "DELETE":
        result = db.delete_user(user_id)
        return JsonResponse(result, status=get_status_code(result))

    return JsonResponse({"error": "Method not allowed"}, status=405)

def user_change_password(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.user_change_password(user_id, data["new_password"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def update_user(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.update_user(user_id, data)
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

# User Account - Additional Endpoints
def get_user(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_user(user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_user_organizations_admin(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_user_organizations_admin(user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_user_organizations_member(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_user_organizations_member(user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_user_organizations_congregant(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_user_organizations_congregant(user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_user_posts(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_user_posts(user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_user_followers(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_user_followers(user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_user_following(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_user_following(user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Organization Account
def create_organization(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.create_organization(data["name"], data["parent_id"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def delete_organization(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "DELETE":
        result = db.delete_organization(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def update_organization(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.update_organization(org_id, data["name"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_organization(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_organization(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_organization_children(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_organization_children(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_organization_posts(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_organization_posts(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_organization_admins(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_organization_admins(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_organization_members(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_organization_members(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_organization_congregants(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_organization_congregants(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_organization_followers(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_organization_followers(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_organization_following(request: HttpRequest, org_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_organization_following(org_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# User/Organization Affiliation
def add_organization_admin(request: HttpRequest, org_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.add_organization_admin(org_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_organization_admin(request: HttpRequest, org_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.remove_organization_admin(org_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def add_organization_member(request: HttpRequest, org_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.add_organization_member(org_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_organization_member(request: HttpRequest, org_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.remove_organization_member(org_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def add_organization_congregant(request: HttpRequest, org_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.add_organization_congregant(org_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_organization_congregant(request: HttpRequest, org_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.remove_organization_congregant(org_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Follow/Unfollow
def follow(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.follow(data["follower_id"], data["followee_id"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def unfollow(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.unfollow(data["follower_id"], data["followee_id"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Posts
def create_post(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.create_post(
                data["author_id"],
                data["caption"],
                data["image_url"],
                data.get("location")
            )
            # TODO: Send to websocket
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def delete_post(request: HttpRequest, post_id: int) -> JsonResponse:
    if request.method == "DELETE":
        result = db.delete_post(post_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def update_post(request: HttpRequest, post_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.update_post(
                post_id,
                data["author_id"],
                data["caption"],
                data["image_url"],
                data.get("location")
            )
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_post(request: HttpRequest, post_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_post(post_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Events
def create_event(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.create_event(
                data["author_id"],
                data["title"],
                data["description"],
                data["start_time"],
                data["end_time"],
                data["location"]
            )
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def delete_event(request: HttpRequest, event_id: int) -> JsonResponse:
    if request.method == "DELETE":
        result = db.delete_event(event_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def update_event(request: HttpRequest, event_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.update_event(
                event_id,
                data["author_id"],
                data["title"],
                data["description"],
                data["start_time"],
                data["end_time"],
                data["location"]
            )
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_event(request: HttpRequest, event_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_event(event_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Events Going/Interested
def going_event(request: HttpRequest, event_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.going_event(event_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_going_event(request: HttpRequest, event_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.remove_going_event(event_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def interested_event(request: HttpRequest, event_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.interested_event(event_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_interested_event(request: HttpRequest, event_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.remove_interested_event(event_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Post/Event Comments
def create_comment(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.create_comment(
                data["post_id"],
                data['parent_id'],
                data["author_id"],
                data["content"]
            )

            if result['success']:
                channel_layer = get_channel_layer()
                if data['parent_id'] == 0:
                    # This is a comment, not a reply
                    async_to_sync(channel_layer.group_send)(
                        f"comments_{data['post_id']}",
                        {
                            "type": "send_comment",
                            "comment": result['data'],
                            "user": result['data'].get('author_name', ''),
                            "timestamp": result['data'].get('created_at', '')
                        }
                    )
                else:
                    # This is a reply
                    async_to_sync(channel_layer.group_send)(
                        f"replies_{data['parent_id']}",
                        {
                            "type": "send_reply",
                            "reply": result['data'],
                            "user": result['data'].get('author_name', ''),
                            "timestamp": result['data'].get('created_at', '')
                        }
                    )

            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def delete_comment(request: HttpRequest, comment_id: int) -> JsonResponse:
    if request.method == "DELETE":
        result = db.delete_comment(comment_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def update_comment(request: HttpRequest, comment_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.update_comment(comment_id, data["content"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_comment(request: HttpRequest, comment_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_comment(comment_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Posts Like/Dislike
def like(request: HttpRequest, post_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.like(post_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_like(request: HttpRequest, post_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.remove_like(post_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def dislike(request: HttpRequest, post_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.dislike(post_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_dislike(request: HttpRequest, post_id: int, user_id: int) -> JsonResponse:
    if request.method == "POST":
        result = db.remove_dislike(post_id, user_id)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Post/Event Feed
def get_comments(request: HttpRequest, user_id: int, post_id: int) -> JsonResponse:
    if request.method == "GET":
        offset = int(request.GET.get("offset", 0))
        limit = int(request.GET.get("limit", 10))
        result = db.get_comments(user_id, post_id, offset, limit)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_replies(request: HttpRequest, user_id: int, comment_id: int) -> JsonResponse:
    if request.method == "GET":
        offset = int(request.GET.get("offset", 0))
        limit = int(request.GET.get("limit", 10))
        result = db.get_replies(user_id, comment_id, offset, limit)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_user_feed(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        offset = int(request.GET.get("offset", 0))
        limit = int(request.GET.get("limit", 10))
        result = db.get_user_feed(user_id, offset, limit)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# Messaging Endpoints
def get_chats(request: HttpRequest, user_id: int) -> JsonResponse:
    if request.method == "GET":
        result = db.get_chats(user_id)
        return JsonResponse(result, status=get_status_code(result))

    return JsonResponse({"error": "Method not allowed"}, status=405)

def get_chat_messages(request: HttpRequest, chat_id: int) -> JsonResponse:
    if request.method == "GET":
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 10))
        result = db.get_chat_messages(chat_id, offset, limit)
        return JsonResponse(result, status=get_status_code(result))

    return JsonResponse({"error": "Method not allowed"}, status=405)

def create_chat(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.create_chat(data["members"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def create_group_chat(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.create_group_chat(data["members"], data["name"], data["image_url"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def add_group_chat_member(request: HttpRequest, chat_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.add_group_chat_member(chat_id, data["member"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_group_chat_member(request: HttpRequest, chat_id: int, member_id: int) -> JsonResponse:
    if request.method == "DELETE":
        result = db.remove_group_chat_member(chat_id, member_id)
        return JsonResponse(result, status=get_status_code(result))

    return JsonResponse({"error": "Method not allowed"}, status=405)

def create_chat_message(request: HttpRequest, chat_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.create_chat_message(chat_id, data["sender_id"], data["content"])

            # Only send WebSocket message if the database operation was successful
            if result.get("success"):
                try:
                    channel_layer = get_channel_layer()
                    message_data = {
                        "type": "send_message",
                        "message": result['data'], # contains all message info
                        "chat_id": chat_id,
                        "user": result['data'].get('sender_id', ''),
                        "timestamp": result['data'].get('created_at', '')
                    }
                    
                    async_to_sync(channel_layer.group_send)(
                        f"chat_{chat_id}",
                        message_data
                    )
                except Exception as e:
                    # Don't fail the request if WebSocket fails
                    pass

            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def delete_chat_message(request: HttpRequest, chat_id: int, message_id: int) -> JsonResponse:
    if request.method == "DELETE":
        result = db.delete_chat_message(chat_id, message_id)
        return JsonResponse(result, status=get_status_code(result))

    return JsonResponse({"error": "Method not allowed"}, status=405)

def read_chat_message(request: HttpRequest, chat_id: int, message_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.read_chat_message(chat_id, message_id, data["user_id"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def react_to_chat_message(request: HttpRequest, chat_id: int, message_id: int) -> JsonResponse:
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.react_to_chat_message(chat_id, message_id, data["user_id"], data["reaction"])
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

def remove_chat_message_reaction(request: HttpRequest, chat_id: int, message_id: int, reaction_id: int) -> JsonResponse:
    print("removing reaction", chat_id, message_id, reaction_id)
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            result = db.remove_chat_message_reaction(chat_id, message_id, data["user_id"], reaction_id)
            return JsonResponse(result, status=get_status_code(result))
        except (KeyError, json.JSONDecodeError):
            return JsonResponse({"error": "Invalid input"}, status=400)

    return JsonResponse({"error": "Method not allowed"}, status=405)

# Search
def search(request: HttpRequest) -> JsonResponse:
    if request.method == "GET":
        query = request.GET.get("query")
        if not query:
            return JsonResponse({"error": "Missing query parameter"}, status=400)
        include_posts = request.GET.get("includePosts", "true").lower() == "true"
        include_events = request.GET.get("includeEvents", "true").lower() == "true"
        include_organizations = request.GET.get("includeOrganizations", "true").lower() == "true"
        include_users = request.GET.get("includeUsers", "true").lower() == "true"
        result = db.search(
            query,
            include_posts=include_posts,
            include_events=include_events,
            include_organizations=include_organizations,
            include_users=include_users,
        )
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def search_organizations(request: HttpRequest) -> JsonResponse:
    if request.method == "GET":
        query = request.GET.get("query")
        if not query:
            return JsonResponse({"error": "Missing query parameter"}, status=400)
        result = db.search_organizations(query)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

def search_events(request: HttpRequest) -> JsonResponse:
    if request.method == "GET":
        query = request.GET.get("query")
        if not query:
            return JsonResponse({"error": "Missing query parameter"}, status=400)
        result = db.search_events(query)
        return JsonResponse(result, status=get_status_code(result))
    return JsonResponse({"error": "Method not allowed"}, status=405)

# creation of presigned urls
def generate_presigned_url(request):
    filename = request.GET.get("filename")
    filetype = request.GET.get("filetype")
    if not filename or not filetype:
        return JsonResponse({"error": "Missing filename or filetype"}, status=400)

    s3_client = boto3.client(
        "s3",
        region_name=os.environ.get('region_name'),
        aws_access_key_id= os.environ.get('aws_access_key_id'),
        aws_secret_access_key= os.environ.get('aws_secret_access_key'),
    )

    key = f"uploads/{filename}"

    try:
        url = s3_client.generate_presigned_url(
            "put_object",
            Params={
                "Bucket": os.environ.get('aws_bucket'),
                "Key": key,
                "ContentType": "image/jpeg",
            },
            ExpiresIn=3000,  # 3000 seconds
        )

        return JsonResponse({"uploadURL": url, "key": key})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
def test_boto3_connection(request):
    s3 = boto3.client(
        's3',
        aws_access_key_id=os.environ.get('aws__access_key_id'),
        aws_secret_access_key=os.environ.get('aws_secret_access_key'),
        region_name= os.environ.get('region_name')
    )

    try:
        # Attempt to list buckets (or list objects in your bucket)
        response = s3.list_buckets()
        print("Buckets:", response['Buckets'])  # Log to console
        return JsonResponse({'status': 'success', 'buckets': response['Buckets']})
    except Exception as e:
        print("Boto3 Error:", str(e))
        return JsonResponse({'status': 'error', 'message': str(e)})
    
# Make all endpoints csrf_exempt
get_test = csrf_exempt(get_test)
get_int_test = csrf_exempt(get_int_test)
authenticate_user = csrf_exempt(authenticate_user)
logout_user = csrf_exempt(logout_user)
create_user = csrf_exempt(create_user)
delete_user = csrf_exempt(delete_user)
user_change_password = csrf_exempt(user_change_password)
update_user = csrf_exempt(update_user)
get_user = csrf_exempt(get_user)
get_user_organizations_admin = csrf_exempt(get_user_organizations_admin)
get_user_organizations_member = csrf_exempt(get_user_organizations_member)
get_user_organizations_congregant = csrf_exempt(get_user_organizations_congregant)
get_user_posts = csrf_exempt(get_user_posts)
get_user_followers = csrf_exempt(get_user_followers)
get_user_following = csrf_exempt(get_user_following)
create_organization = csrf_exempt(create_organization)
delete_organization = csrf_exempt(delete_organization)
update_organization = csrf_exempt(update_organization)
get_organization = csrf_exempt(get_organization)
get_organization_children = csrf_exempt(get_organization_children)
get_organization_posts = csrf_exempt(get_organization_posts)
get_organization_admins = csrf_exempt(get_organization_admins)
get_organization_members = csrf_exempt(get_organization_members)
get_organization_congregants = csrf_exempt(get_organization_congregants)
get_organization_followers = csrf_exempt(get_organization_followers)
get_organization_following = csrf_exempt(get_organization_following)
add_organization_admin = csrf_exempt(add_organization_admin)
remove_organization_admin = csrf_exempt(remove_organization_admin)
add_organization_member = csrf_exempt(add_organization_member)
remove_organization_member = csrf_exempt(remove_organization_member)
add_organization_congregant = csrf_exempt(add_organization_congregant)
remove_organization_congregant = csrf_exempt(remove_organization_congregant)
follow = csrf_exempt(follow)
unfollow = csrf_exempt(unfollow)
create_post = csrf_exempt(create_post)
delete_post = csrf_exempt(delete_post)
update_post = csrf_exempt(update_post)
get_post = csrf_exempt(get_post)
create_event = csrf_exempt(create_event)
delete_event = csrf_exempt(delete_event)
update_event = csrf_exempt(update_event)
get_event = csrf_exempt(get_event)
going_event = csrf_exempt(going_event)
remove_going_event = csrf_exempt(remove_going_event)
interested_event = csrf_exempt(interested_event)
remove_interested_event = csrf_exempt(remove_interested_event)
create_comment = csrf_exempt(create_comment)
delete_comment = csrf_exempt(delete_comment)
update_comment = csrf_exempt(update_comment)
get_comment = csrf_exempt(get_comment)
like = csrf_exempt(like)
remove_like = csrf_exempt(remove_like)
dislike = csrf_exempt(dislike)
remove_dislike = csrf_exempt(remove_dislike)
get_comments = csrf_exempt(get_comments)
get_replies = csrf_exempt(get_replies)
get_user_feed = csrf_exempt(get_user_feed)
get_chats = csrf_exempt(get_chats)
get_chat_messages = csrf_exempt(get_chat_messages)
create_chat = csrf_exempt(create_chat)
create_group_chat = csrf_exempt(create_group_chat)
add_group_chat_member = csrf_exempt(add_group_chat_member)
remove_group_chat_member = csrf_exempt(remove_group_chat_member)
create_chat_message = csrf_exempt(create_chat_message)
delete_chat_message = csrf_exempt(delete_chat_message)
read_chat_message = csrf_exempt(read_chat_message)
react_to_chat_message = csrf_exempt(react_to_chat_message)
remove_chat_message_reaction = csrf_exempt(remove_chat_message_reaction)
search = csrf_exempt(search)
search_organizations = csrf_exempt(search_organizations)
search_events = csrf_exempt(search_events)
generate_presigned_url = csrf_exempt(generate_presigned_url)
