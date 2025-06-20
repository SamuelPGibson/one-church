# OneChurch

A social media platform for the Body of Christ to connect with each other across the globe. 

Features
- ability to create an account for your Church/organization or personal
    - user auth
    - following & followers
    - create posts
    - share events
        - worship nights
        - outreach
        - workshops
        - conferences
- private messaging

Backend: Python DJango? LMK what you guys are comnfortable with!
Frontend: React Js

TABLES

User
-   id          Int       
- email       String    
- password    String    
- name        String
- isChurch    Boolean   
- profilePic     
- bio         String?
- createdAt   DateTime  @default(now())
- posts       Post[]
- followers   Follower[] @relation("UserFollowers")
- following   Follower[] @relation("UserFollowing")
- messagesSent Message[] @relation("MessagesSent")
- messagesReceived Message[] @relation("MessagesReceived")
- events 

Post
- id
- user
- user id
- content
- media
- createdAt
- likes
- comments

Likes
- id
- user
- user Id
- post
- post Id

Comments
- id
- post 
- post Id
- user 
- user Id
- content
- createdAt

Follower 
- id 
- follower
- follower Id
- following

Message
- id 
- sender 
- sender Id
- receiver
- reciever Id
- content 
- createdAt
- read/delivered 

Event
- id
- creator 
- creator Id
- title
- description
- startDate
- endDate
- location
- attendees
- createdAt

EventAttendees
- id 
- event
- eventID
- user
- user Id

# API Endpoints

## Auth & User Management

| Method | Endpoint                        | Description                          |
|--------|----------------------------------|--------------------------------------|
| POST   | `/api/auth/register/`           | Register a user or church            |
| POST   | `/api/auth/login/`              | Log in and get token                 |
| POST   | `/api/auth/logout/`             | Log out                              |
| GET    | `/api/auth/user/`               | Get current user info                |
| PUT    | `/api/auth/user/`               | Update current user profile          |
| POST   | `/api/auth/password-reset/`     | Request password reset email         |
| POST   | `/api/auth/password-reset/confirm/` | Confirm new password             |

## Church / Organization Profiles

| Method | Endpoint                 | Description                          |
|--------|--------------------------|--------------------------------------|
| GET    | `/api/churches/`         | List all churches                    |
| POST   | `/api/churches/`         | Create church profile                |
| GET    | `/api/churches/<id>/`    | Retrieve church details              |
| PUT    | `/api/churches/<id>/`    | Update church info                   |
| DELETE | `/api/churches/<id>/`    | Delete church profile                |

---

## User Profiles & Relationships

| Method | Endpoint                         | Description                     |
|--------|----------------------------------|---------------------------------|
| GET    | `/api/users/`                    | List all users                  |
| GET    | `/api/users/<id>/`               | View user profile               |
| POST   | `/api/users/<id>/follow/`        | Follow user                     |
| POST   | `/api/users/<id>/unfollow/`      | Unfollow user                   |
| GET    | `/api/users/<id>/followers/`     | List followers                  |
| GET    | `/api/users/<id>/following/`     | List following users            |

## Posts & Comments

| Method | Endpoint                            | Description                          |
|--------|-------------------------------------|--------------------------------------|
| GET    | `/api/posts/`                       | List all posts                       |
| POST   | `/api/posts/`                       | Create new post                      |
| GET    | `/api/posts/<id>/`                  | View a single post                   |
| PUT    | `/api/posts/<id>/`                  | Edit post                            |
| DELETE | `/api/posts/<id>/`                  | Delete post                          |
| POST   | `/api/posts/<id>/like/`             | Like/unlike post                     |
| POST   | `/api/posts/<id>/comment/`          | Add comment to post                  |
| GET    | `/api/posts/<id>/comments/`         | Get comments for post                |

## Events (Worship Nights, Outreach, Workshops)

| Method | Endpoint                      | Description                      |
|--------|-------------------------------|----------------------------------|
| GET    | `/api/events/`                | List public events               |
| POST   | `/api/events/`                | Create an event                  |
| GET    | `/api/events/<id>/`           | Get event details                |
| PUT    | `/api/events/<id>/`           | Edit event                       |
| DELETE | `/api/events/<id>/`           | Delete event                     |
| GET    | `/api/events/<id>/attendees/` | List attendees                   |

## Private Messaging

| Method | Endpoint                               | Description                      |
|--------|----------------------------------------|----------------------------------|
| GET    | `/api/messages/`                       | List conversations               |
| POST   | `/api/messages/`                       | Send new message                 |
| GET    | `/api/messages/<conversation_id>/`     | Get conversation thread          |
| POST   | `/api/messages/<conversation_id>/reply/` | Send reply in thread           |

## Search & Discovery

| Method | Endpoint                         | Description                        |
|--------|----------------------------------|------------------------------------|
| GET    | `/api/search/users/?q=`         | Search users by name               |
| GET    | `/api/search/churches/?q=`      | Search churches by name/location  |
| GET    | `/api/search/events/?q=`        | Search events                      |
