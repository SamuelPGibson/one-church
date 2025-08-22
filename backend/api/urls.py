'''
Mapping URLs to backend functions
'''

from django.urls import path
from . import views

urlpatterns = [
    # Health Check
    path('test/', views.get_test),
    path('inttest/<int:int_value>/', views.get_int_test),

    # Login and Logout
    path('login/', views.authenticate_user),
    path('logout/', views.logout_user),

    # User Account
    path('users/', views.create_user),
    path('users/<int:user_id>/', views.delete_user),
    path('users/<int:user_id>/change_password/', views.user_change_password),
    path('users/<int:user_id>/update/', views.update_user),

    # User Account - Additional Endpoints
    path('users/<int:user_id>/info/', views.get_user),
    path('users/<int:user_id>/organizations/admin/', views.get_user_organizations_admin),
    path('users/<int:user_id>/organizations/member/', views.get_user_organizations_member),
    path('users/<int:user_id>/organizations/congregant/', views.get_user_organizations_congregant),
    path('users/<int:user_id>/posts/', views.get_user_posts),
    path('users/<int:user_id>/followers/', views.get_user_followers),
    path('users/<int:user_id>/following/', views.get_user_following),

    # Organization Account
    path('organizations/', views.create_organization),
    path('organizations/<int:org_id>/', views.delete_organization),
    path('organizations/<int:org_id>/update/', views.update_organization),
    path('organizations/<int:org_id>/info/', views.get_organization),
    path('organizations/<int:org_id>/children/', views.get_organization_children),
    path('organizations/<int:org_id>/posts/', views.get_organization_posts),
    path('organizations/<int:org_id>/admins/', views.get_organization_admins),
    path('organizations/<int:org_id>/members/', views.get_organization_members),
    path('organizations/<int:org_id>/congregants/', views.get_organization_congregants),
    path('organizations/<int:org_id>/followers/', views.get_organization_followers),
    path('organizations/<int:org_id>/following/', views.get_organization_following),

    # User/Organization Affiliation
    path('organizations/<int:org_id>/admins/add/<int:user_id>/', views.add_organization_admin),
    path('organizations/<int:org_id>/admins/remove/<int:user_id>/', views.remove_organization_admin),
    path('organizations/<int:org_id>/members/add/<int:user_id>/', views.add_organization_member),
    path('organizations/<int:org_id>/members/remove/<int:user_id>/', views.remove_organization_member),
    path('organizations/<int:org_id>/congregants/add/<int:user_id>/', views.add_organization_congregant),
    path('organizations/<int:org_id>/congregants/remove/<int:user_id>/', views.remove_organization_congregant),

    # Follow/Unfollow
    path('follow/', views.follow),
    path('unfollow/', views.unfollow),

    # Posts
    path('posts/', views.create_post),
    path('posts/<int:post_id>/', views.get_post),
    path('posts/<int:post_id>/delete/', views.delete_post),
    path('posts/<int:post_id>/update/', views.update_post),

    # Events
    path('events/', views.create_event),
    path('events/<int:event_id>/', views.get_event),
    path('events/<int:event_id>/delete/', views.delete_event),
    path('events/<int:event_id>/update/', views.update_event),

    # Events Going/Interested
    path('events/<int:event_id>/going/<int:user_id>/', views.going_event),
    path('events/<int:event_id>/going/<int:user_id>/remove/', views.remove_going_event),
    path('events/<int:event_id>/interested/<int:user_id>/', views.interested_event),
    path('events/<int:event_id>/interested/<int:user_id>/remove/', views.remove_interested_event),

    # Post/Event Comments
    path('comments/', views.create_comment),
    path('comments/<int:comment_id>/', views.get_comment),
    path('comments/<int:comment_id>/delete/', views.delete_comment),
    path('comments/<int:comment_id>/update/', views.update_comment),

    # Posts Like/Dislike
    path('posts/<int:post_id>/like/<int:user_id>/', views.like),
    path('posts/<int:post_id>/like/<int:user_id>/remove/', views.remove_like),
    path('posts/<int:post_id>/dislike/<int:user_id>/', views.dislike),
    path('posts/<int:post_id>/dislike/<int:user_id>/remove/', views.remove_dislike),

    # Post/Event Feed
    path('users/<int:user_id>/posts/<int:post_id>/comments/', views.get_comments),
    path('users/<int:user_id>/comments/<int:comment_id>/replies/', views.get_replies),
    path('users/<int:user_id>/feed/', views.get_user_feed),

    # Messaging
    path('users/<int:user_id>/chats/', views.get_chats),
    path('chats/<int:chat_id>/messages/', views.get_chat_messages),
    path('chats/create/', views.create_chat),
    path('chats/group/create/', views.create_group_chat),
    path('chats/<int:chat_id>/members/add/', views.add_group_chat_member),
    path('chats/<int:chat_id>/members/<int:member_id>/remove/', views.remove_group_chat_member),
    path('chats/<int:chat_id>/messages/create/', views.create_chat_message),
    path('chats/<int:chat_id>/messages/<int:message_id>/delete/', views.delete_chat_message),
    path('chats/<int:chat_id>/messages/<int:message_id>/read/', views.read_chat_message),
    path('chats/<int:chat_id>/messages/<int:message_id>/reactions/add/', views.react_to_chat_message),
    path('chats/<int:chat_id>/messages/<int:message_id>/reactions/<int:reaction_id>/remove/', views.remove_chat_message_reaction),

    # Search
    path('search/', views.search),
    path('search/organizations/', views.search_organizations),
    path('search/events/', views.search_events),

    # Feedback
    path('feedback/', views.create_user_feedback),
    
    # presigned image url
    path('presigned-url/', views.generate_presigned_url),
    path('test-boto3/', views.test_boto3_connection),
]
