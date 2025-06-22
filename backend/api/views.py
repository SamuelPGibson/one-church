'''
Functions for handling API requests
'''

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from database import Database, PostgreSQLDatabase

db: Database = PostgreSQLDatabase()

@csrf_exempt
def get_test(request):
    if request.method == "GET":
        resp = db.get_test()
        return JsonResponse({"message": resp})

@csrf_exempt
def get_post(request, post_id):
    if request.method == "GET":
        db.get_test()
        post = db.get_post(post_id)
        if post:
            return JsonResponse(post)
        return JsonResponse({"error": "Post not found"}, status=404)

@csrf_exempt
def create_post(request):
    if request.method == "POST":
        data = json.loads(request.body)
        post = db.create_post(
            author_id=data["author_id"],
            content=data["content"]
        )
        return JsonResponse(post, status=201)
