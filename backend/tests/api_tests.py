import unittest
import requests

BASE_URL = "http://127.0.0.1:8000/api/"

class APITestCase(unittest.TestCase):
    def setUp(self):
        # Create a user and organization for use in tests
        self.username = "testuser"
        self.password = "testpass"
        self.new_username = "updateduser"
        self.org_name = "TestOrg"
        self.org_parent_id = 0

        # Create user
        r = requests.post(BASE_URL + "users/", json={"username": self.username, "password": self.password})
        self.assertTrue(r.json().get("success"))
        self.user_id = r.json().get("id")

        # Create organization
        r = requests.post(BASE_URL + "organizations/", json={"name": self.org_name, "parent_id": self.org_parent_id})
        self.assertTrue(r.json().get("success"))
        self.org_id = r.json()["data"]["id"]

    def tearDown(self):
        # Delete user and organization
        requests.delete(BASE_URL + f"users/{self.user_id}/")
        requests.delete(BASE_URL + f"organizations/{self.org_id}/")

    def test_health_check(self):
        r = requests.get(BASE_URL + "test/")
        self.assertEqual(r.status_code, 200)
        self.assertIn("message", r.json())

        r = requests.get(BASE_URL + "inttest/42/")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.json().get("int_value"), 42)

    def test_authenticate_and_logout(self):
        r = requests.post(BASE_URL + "login/", json={"username": self.username, "password": self.password})
        self.assertTrue(r.json().get("success"))
        user_id = r.json().get("id")

        r = requests.post(BASE_URL + "logout/", json={"user_id": user_id})
        self.assertTrue(r.json().get("success"))

    def test_user_account(self):
        # Change password
        r = requests.post(BASE_URL + f"users/{self.user_id}/change_password/", json={"new_password": "newpass"})
        self.assertTrue(r.json().get("success"))

        # Update username
        r = requests.post(BASE_URL + f"users/{self.user_id}/update/", json={"username": self.new_username})
        self.assertTrue(r.json().get("success"))

        # Get user info
        r = requests.get(BASE_URL + f"users/{self.user_id}/info/")
        self.assertTrue(r.json().get("success"))
        self.assertEqual(r.json()["data"]["username"], self.new_username)

    def test_user_organizations_and_posts(self):
        for role in ["admin", "member", "congregant"]:
            r = requests.get(BASE_URL + f"users/{self.user_id}/organizations/{role}/")
            self.assertTrue(r.json().get("success"))
            self.assertIn("data", r.json())

        r = requests.get(BASE_URL + f"users/{self.user_id}/posts/")
        self.assertTrue(r.json().get("success"))

        r = requests.get(BASE_URL + f"users/{self.user_id}/followers/")
        self.assertTrue(r.json().get("success"))

        r = requests.get(BASE_URL + f"users/{self.user_id}/following/")
        self.assertTrue(r.json().get("success"))

    def test_organization_account(self):
        # Update organization
        r = requests.post(BASE_URL + f"organizations/{self.org_id}/update/", json={"name": "UpdatedOrg"})
        self.assertTrue(r.json().get("success"))

        # Get organization info
        r = requests.get(BASE_URL + f"organizations/{self.org_id}/info/")
        self.assertTrue(r.json().get("success"))
        self.assertEqual(r.json()["data"]["name"], "UpdatedOrg")

        # Get children, posts, admins, members, congregants, followers, following
        for endpoint in ["children", "posts", "admins", "members", "congregants", "followers", "following"]:
            r = requests.get(BASE_URL + f"organizations/{self.org_id}/{endpoint}/")
            self.assertTrue(r.json().get("success"))

    def test_user_organization_affiliation(self):
        # Add and remove admin
        r = requests.post(BASE_URL + f"organizations/{self.org_id}/admins/add/{self.user_id}/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"organizations/{self.org_id}/admins/remove/{self.user_id}/")
        self.assertTrue(r.json().get("success"))

        # Add and remove member
        r = requests.post(BASE_URL + f"organizations/{self.org_id}/members/add/{self.user_id}/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"organizations/{self.org_id}/members/remove/{self.user_id}/")
        self.assertTrue(r.json().get("success"))

        # Add and remove congregant
        r = requests.post(BASE_URL + f"organizations/{self.org_id}/congregants/add/{self.user_id}/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"organizations/{self.org_id}/congregants/remove/{self.user_id}/")
        self.assertTrue(r.json().get("success"))

    def test_follow_unfollow(self):
        # Follow and unfollow self (for test)
        r = requests.post(BASE_URL + "follow/", json={"follower_id": self.user_id, "followee_id": self.user_id})
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + "unfollow/", json={"follower_id": self.user_id, "followee_id": self.user_id})
        self.assertTrue(r.json().get("success"))

    def test_posts(self):
        # Create post
        r = requests.post(BASE_URL + "posts/", json={
            "author_id": self.user_id,
            "caption": "Test Caption",
            "image_url": "http://example.com/image.jpg",
            "location": "Test Location"
        })
        self.assertTrue(r.json().get("success"))
        post_id = r.json().get("id")

        # Get post
        r = requests.get(BASE_URL + f"posts/{post_id}/")
        self.assertTrue(r.json().get("success"))

        # Update post
        r = requests.post(BASE_URL + f"posts/{post_id}/update/", json={
            "author_id": self.user_id,
            "caption": "Updated Caption",
            "image_url": "http://example.com/image2.jpg",
            "location": "New Location"
        })
        self.assertTrue(r.json().get("success"))

        # Like, dislike, remove like/dislike
        r = requests.post(BASE_URL + f"posts/{post_id}/like/{self.user_id}/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"posts/{post_id}/like/{self.user_id}/remove/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"posts/{post_id}/dislike/{self.user_id}/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"posts/{post_id}/dislike/{self.user_id}/remove/")
        self.assertTrue(r.json().get("success"))

        # Delete post
        r = requests.delete(BASE_URL + f"posts/{post_id}/delete/")
        self.assertTrue(r.json().get("success"))

    def test_events(self):
        # Create event
        r = requests.post(BASE_URL + "events/", json={
            "author_id": self.user_id,
            "title": "Test Event",
            "description": "Event Desc",
            "start_time": "2025-01-01T10:00:00Z",
            "end_time": "2025-01-01T12:00:00Z",
            "location": "Event Location"
        })
        self.assertTrue(r.json().get("success"))
        event_id = r.json().get("id")

        # Get event
        r = requests.get(BASE_URL + f"events/{event_id}/")
        self.assertTrue(r.json().get("success"))

        # Update event
        r = requests.post(BASE_URL + f"events/{event_id}/update/", json={
            "author_id": self.user_id,
            "title": "Updated Event",
            "description": "Updated Desc",
            "start_time": "2025-01-01T11:00:00Z",
            "end_time": "2025-01-01T13:00:00Z",
            "location": "New Location"
        })
        self.assertTrue(r.json().get("success"))

        # Going/interested/remove
        r = requests.post(BASE_URL + f"events/{event_id}/going/{self.user_id}/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"events/{event_id}/going/{self.user_id}/remove/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"events/{event_id}/interested/{self.user_id}/")
        self.assertTrue(r.json().get("success"))
        r = requests.post(BASE_URL + f"events/{event_id}/interested/{self.user_id}/remove/")
        self.assertTrue(r.json().get("success"))

        # Delete event
        r = requests.delete(BASE_URL + f"events/{event_id}/delete/")
        self.assertTrue(r.json().get("success"))

    def test_comments(self):
        # Create post for comment
        r = requests.post(BASE_URL + "posts/", json={
            "author_id": self.user_id,
            "caption": "Comment Post",
            "image_url": "http://example.com/image.jpg",
            "location": "Test Location"
        })
        post_id = r.json().get("id")

        # Create comment
        r = requests.post(BASE_URL + "comments/", json={
            "post_id": post_id,
            "author_id": self.user_id,
            "content": "Test Comment"
        })
        self.assertTrue(r.json().get("success"))
        comment_id = r.json().get("id")

        # Get comment
        r = requests.get(BASE_URL + f"comments/{comment_id}/")
        self.assertIn("data", r.json())

        # Update comment
        r = requests.post(BASE_URL + f"comments/{comment_id}/update/", json={"content": "Updated Comment"})
        self.assertTrue(r.json().get("success"))

        # Delete comment
        r = requests.delete(BASE_URL + f"comments/{comment_id}/delete/")
        self.assertTrue(r.json().get("success"))

        # Delete post
        requests.delete(BASE_URL + f"posts/{post_id}/delete/")

    def test_search(self):
        r = requests.get(BASE_URL + "search/", params={"query": self.username})
        self.assertTrue(r.json().get("success"))

        r = requests.get(BASE_URL + "search/organizations/", params={"query": self.org_name})
        self.assertTrue(r.json().get("success"))

        r = requests.get(BASE_URL + "search/events/", params={"query": "Event"})
        self.assertTrue(r.json().get("success"))

if __name__ == "__main__":
    unittest.main()
