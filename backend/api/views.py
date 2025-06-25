'''
Functions for handling API requests
'''

from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt

from typing import Any
import json

from database import Database, DummyDatabase, PostgreSQLDatabase

# db: Database = PostgreSQLDatabase()
db: Database = DummyDatabase()  # Use DummyDatabase for testing

# Helper Functions
def get_status_code(result: dict) -> int:
    ''' returns status code base on "success" key in result '''
    return 200 if result.get("success") else 401

# Test Endpoints
@csrf_exempt
def get_test(request: HttpRequest) -> JsonResponse:
    if request.method == "GET":
        return JsonResponse(db.get_test())
    
def get_int_test(request: HttpRequest, int_value: int) -> JsonResponse:
    if request.method == "GET":
        return JsonResponse(db.get_int_test(int_value))

# Login and Logout
def authenticate_user(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
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
            result = db.create_user(data["username"], data["password"])
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
            result = db.update_user(user_id, data["username"])
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
                data["author_id"],
                data["content"]
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

# Search
def search(request: HttpRequest) -> JsonResponse:
    if request.method == "GET":
        query = request.GET.get("query")
        if not query:
            return JsonResponse({"error": "Missing query parameter"}, status=400)
        result = db.search(query)
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
