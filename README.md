# OneChurch
A social media platform for the Body of Christ to connect with each other across the globe.

[Meeting Notes](https://docs.google.com/document/d/1pUJHi-8vokDYMihsFsQ2jKnH5iamM0fS9fAo9KlK48w/edit?tab=t.0)

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
|--------|-------------------------------------|--------------------------------------| GET    | `/api/posts/`                       | List all posts                       |git
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


<!-- 🚨 SPECS AND STUFF🚨  -->
## WHAT I WAS ABLE TO GET FROM CHATGPT 🚨 

# OneChurch Fullstack Guide

### Section 2: Backend Setup & Prisma Models

---

## 🔧 PART 2: BACKEND SETUP (Node.js + Express + Prisma)

### Step 1: Initialize Backend Project

```bash
mkdir onechurch-backend
cd onechurch-backend
npm init -y
npm install express cors dotenv prisma @prisma/client

```

### Step 2: Initialize Prisma ORM

```bash
npx prisma init

```

This creates a `prisma` folder with `schema.prisma` and a `.env` file.

---

### Step 3: Configure Database Connection

Edit `.env` file with your PostgreSQL connection string:

```
DATABASE_URL="postgresql://user:password@localhost:5432/onechurch"

```

Replace `user`, `password`, and database name as per your setup.

---

### Step 4: Define Prisma Schema Models

Edit `prisma/schema.prisma` to define your database tables. Here's a recommended schema for OneChurch:

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id          Int       @id @default(autoincrement())
  email       String    @unique
  password    String    // hashed password
  name        String?
  isChurch    Boolean   @default(false)
  profilePic  String?   // URL to profile picture
  bio         String?
  createdAt   DateTime  @default(now())
  posts       Post[]
  followers   Follower[] @relation("UserFollowers")
  following   Follower[] @relation("UserFollowing")
  messagesSent Message[] @relation("MessagesSent")
  messagesReceived Message[] @relation("MessagesReceived")
  events      Event[]   @relation("EventCreator")
}

model Post {
  id          Int       @id @default(autoincrement())
  author      User      @relation(fields: [authorId], references: [id])
  authorId    Int
  content     String
  mediaUrls   String[]  @default([])  // list of image/video URLs
  createdAt   DateTime  @default(now())
  likes       Like[]
  comments    Comment[]
}
id
model Like {
  id      Int    @id @default(autoincrement())
  user    User   @relation(fields: [userId], references: [id])
  userId  Int
  post    Post   @relation(fields: [postId], references: [id])
  postId  Int

  @@unique([userId, postId])
}

model Comment {
  id        Int      @id @default(autoincrement())
  post      Post     @relation(fields: [postId], references: [id])
  postId    Int
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
  content   String
  createdAt DateTime @default(now())
}

model Follower {
  id          Int    @id @default(autoincrement())
  follower    User   @relation("UserFollowing", fields: [followerId], references: [id])
  followerId  Int
  following   User   @relation("UserFollowers", fields: [followingId], references: [id])
  followingId Int

  @@unique([followerId, followingId])
}

model Message {
  id            Int      @id @default(autoincrement())
  sender        User     @relation("MessagesSent", fields: [senderId], references: [id])
  senderId      Int
  receiver      User     @relation("MessagesReceived", fields: [receiverId], references: [id])
  receiverId    Int
  content       String
  createdAt     DateTime @default(now())
  read          Boolean  @default(false)
}

model Event {
  id          Int      @id @default(autoincrement())
  creator     User     @relation("EventCreator", fields: [creatorId], references: [id])
  creatorId   Int
  title       String
  description String
  startDate   DateTime
  endDate     DateTime
  location    String?
  attendees   User[]   @relation("EventAttendees", references: [id])
  createdAt   DateTime @default(now())
}

model EventAttendees {
  id        Int    @id @default(autoincrement())
  event     Event  @relation(fields: [eventId], references: [id])
  eventId   Int
  user      User   @relation(fields: [userId], references: [id])
  userId    Int

  @@unique([eventId, userId])
}

```

**Notes:**

- The `User` model has a boolean `isChurch` to distinguish personal accounts vs church/org accounts.
- `Post` can have text and media URLs.
- `Follower` models the many-to-many follow relationship between users.
- `Message` supports private messaging.
- `Event` and `EventAttendees` support church events and RSVPs.

---

### Step 5: Push Prisma Schema to Database

Run this command to create tables in your database:

```bash
npx prisma db push

```

---

### Step 6: Generate Prisma Client

```bash
npx prisma generate

```

---

### Step 7: Create Basic Express Server

Create `server.js` in your backend folder:

```
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('OneChurch backend running');
});

// Example route to get all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```

---

### What’s Next?

- Build out routes for posts, followers, messages, and events
- Implement authentication and authorization (covered in next section)
- Connect backend with frontend

---

Would you like me to continue with Section 3: Authentication & Authorization?

Here’s **Section 3: Authentication & Authorization** for your OneChurch project.

---





### Summary

- User authentication is set up using Clerk for fast, secure auth.
- Backend Prisma models cover users, posts, comments, likes, followers, and events.
- Basic API endpoints for posts, events, and real-time messaging.
- React frontend fetches and displays posts and includes real-time chat.
- You have a solid base MVP with core features ready to build on!