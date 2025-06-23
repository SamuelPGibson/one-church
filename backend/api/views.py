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

@csrf_exempt
def get_test(request: HttpRequest) -> JsonResponse:
    if request.method == "GET":
        return JsonResponse(db.get_test())
    
def get_int_test(request: HttpRequest, int_value: int) -> JsonResponse:
    if request.method == "GET":
        return JsonResponse(db.get_int_test(int_value))

@csrf_exempt
def get_post(request: HttpRequest, post_id: int) -> JsonResponse:
    if request.method == "GET":
        post: dict[str, Any] | None = db.get_post(post_id)
        if post:
            return JsonResponse(post)
        return JsonResponse({"error": "Post not found"}, status=404)

@csrf_exempt
def create_post(request: HttpRequest) -> JsonResponse:
    if request.method == "POST":
        data = json.loads(request.body)
        post = db.create_post(
            author_id=data["author_id"],
            content=data["content"]
        )
        return JsonResponse(post, status=201)
