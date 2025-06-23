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

# OneChurch Fullstack Guide

### Section 3: Authentication & Authorization

---

## 🔐 PART 3: USER AUTHENTICATION & AUTHORIZATION

OneChurch requires user accounts for both individuals and churches, secure login, and protected routes.

---

### Option 1: Using Clerk.dev (Recommended for React)

**Setup:**

1. Go to [https://clerk.dev](https://clerk.dev/) and sign up for a free account.
2. Create a new application in the Clerk dashboard.
3. Copy your Clerk frontend API key.

---

**Install Clerk SDK in frontend:**

```bash
npm install @clerk/clerk-react

```

---

**Wrap your React app with ClerkProvider:**

In `main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

const clerkFrontendApi = 'your-clerk-frontend-api'; // from Clerk dashboard

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <App />
  </ClerkProvider>
);

```

---

**Protect routes and get user info:**

In `App.jsx` or specific pages:

```jsx
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function NavBar() {
  return (
    <nav>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <a href="/sign-in">Sign In</a>
      </SignedOut>
    </nav>
  );
}

```

---

**Add Clerk React components for sign-in/sign-up:**

Create pages `/sign-in.jsx` and `/sign-up.jsx` with Clerk’s pre-built components:

```jsx
import { SignIn } from '@clerk/clerk-react';

export default function SignInPage() {
  return <SignIn />;
}

```

Similarly for `SignUp`.

---

**Backend Integration:**

- Use Clerk middleware or verify tokens on backend to secure API routes.
- In Express, verify the `Authorization` header with Clerk SDK.

Example:

```
const { auth } = require('@clerk/clerk-sdk-node');

app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const verified = await auth.verifyToken(token);
    req.userId = verified.sub; // use this for DB queries
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

```

---

### Option 2: Firebase Authentication (Alternative)

- Setup Firebase project and enable Email/Password or other providers.
- Use Firebase SDK on frontend for login/signup.
- Use Firebase Admin SDK on backend to verify tokens.

---

### Option 3: Manual Authentication (Email + Password + JWT)

- Use bcrypt for hashing passwords.
- Use JSON Web Tokens (JWT) for sessions.
- Build login, signup, and protected routes manually.

---

### Best Practices

- Never store plain passwords; always hash.
- Use HTTPS for all requests.
- Protect backend routes by verifying auth tokens.
- Store tokens securely on the client (e.g., HttpOnly cookies or localStorage carefully).

---

### Next Steps

- Implement auth-protected CRUD routes for Posts, Events, Messaging.
- Connect frontend user sessions with backend authorization.

---

Would you like me to continue with Section 4: Media Uploads & Real-Time Messaging?

Here’s **Section 4: Media Uploads & Real-Time Messaging** for your OneChurch project.

---

# OneChurch Fullstack Guide

### Section 4: Media Uploads & Real-Time Messaging

---

## 📸 PART 4: MEDIA UPLOADS

Users and churches will want to upload images and videos for posts and profiles.

---

### Option 1: Using Cloudinary

**Setup:**

1. Sign up at [https://cloudinary.com](https://cloudinary.com/) and create a free account.
2. Get your **Cloud name**, **API Key**, and **API Secret** from your dashboard.

---

**Backend:**

Install Cloudinary SDK:

```bash
npm install cloudinary multer multer-storage-cloudinary

```

Create a Cloudinary config file (e.g., `cloudinary.js`):

```
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

```

Set environment variables in `.env`.

---

**File Upload Middleware with Multer:**

```
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'onechurch',
    allowed_formats: ['jpg', 'jpeg', 'png', 'mp4', 'mov'],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;

```

---

**Express route example:**

```
const parser = require('./path/to/parser');

app.post('/upload', parser.single('media'), (req, res) => {
  // req.file contains uploaded file info
  res.json({ url: req.file.path }); // send back Cloudinary URL
});

```

---

**Frontend:**

Use a file input, send the file with `FormData` to `/upload`, and get back the URL. Store that URL in your post record.

---

### Option 2: Firebase Storage

- Setup Firebase Storage in your Firebase project.
- Use Firebase SDK to upload files directly from frontend.
- Store returned URLs in your backend DB.

---

## 💬 PART 5: REAL-TIME MESSAGING

---

### Option 1: Socket.IO

**Backend:**

Install dependencies:

```bash
npm install socket.io

```

Modify your `server.js`:

```
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (message) => {
    // Broadcast to receiver or all clients
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server with Socket.IO running on port ${PORT}`);
});

```

---

**Frontend:**

Install:

```bash
npm install socket.io-client

```

Use in React component:

```jsx
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off('receiveMessage');
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', input);
    setInput('');
  };

  return (
    <>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}

```

---

### Option 2: Firebase Realtime Database

- Use Firebase Realtime Database or Firestore to sync messages live.
- Leverage Firebase SDK on frontend to listen to messages and send new ones.

---

## Summary

| Feature | Tool | Notes |
| --- | --- | --- |
| Media Uploads | Cloudinary / Firebase Storage | Store media URLs in DB |
| Real-time Messaging | Socket.IO / Firebase | Real-time private messaging |

---

Would you like me to continue with Section 5: Deployment & Hosting?

Here’s **Section 5: Deployment & Hosting** for your OneChurch project.

---

# OneChurch Fullstack Guide

### Section 5: Deployment & Hosting

---

## ☁️ PART 5: DEPLOYMENT & HOSTING

You will deploy the **backend** (Node.js + Express + Prisma API) and **frontend** (React + Vite) to production servers.

---

### Backend Deployment Options

---

### Option 1: Render.com (Recommended)

1. Create an account at [https://render.com](https://render.com/).
2. Connect your GitHub repository containing your backend code.
3. Create a new **Web Service**:
    - Choose Node environment.
    - Set the start command, e.g., `node server.js`.
    - Add environment variables (`DATABASE_URL`, `CLOUDINARY_API_KEY`, etc.).
    - Select a PostgreSQL database (Render also offers managed DBs).
4. Deploy the service. Render will build and start your backend.
5. Test your API URL in the browser or Postman.

---

### Option 2: Railway.app

- Similar to Render, Railway lets you deploy Node apps with managed PostgreSQL.
- Connect your repo, add env vars, and deploy.

---

### Frontend Deployment Options

---

### Option 1: Vercel (Recommended for React + Vite)

1. Create an account at [https://vercel.com](https://vercel.com/).
2. Connect your frontend repo.
3. Vercel auto-detects React and builds your project.
4. Set environment variables (if any).
5. Deploy — your React app will be live on a `.vercel.app` domain.

---

### Option 2: Netlify

- Also great for React apps.
- Connect repo, build, and deploy.

---

### Connecting Frontend & Backend in Production

- In your React app, replace all local API URLs (`http://localhost:5000`) with your deployed backend URL.
- Ensure CORS is properly configured on your backend for your frontend domain.
- Use HTTPS for all URLs.

---

### Database

- Use a managed PostgreSQL service (Render, Railway, Supabase, or AWS RDS).
- Update your backend `.env` with the production DB URL.

---

### Environment Variables Summary

| Variable | Description |
| --- | --- |
| DATABASE_URL | PostgreSQL connection string |
| CLOUDINARY_API_KEY | Cloudinary API Key |
| CLOUDINARY_API_SECRET | Cloudinary API Secret |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| CLERK_FRONTEND_API | Clerk frontend API key (if used) |
| JWT_SECRET | Secret for signing JWT tokens |

---

### Post-Deployment Checks

- Test sign up, login, posting, messaging features.
- Verify media uploads work on production URLs.
- Check that real-time messaging connects properly.
- Confirm no CORS errors in browser console.
- Monitor logs on Render/Vercel for errors.

---

Would you like me to continue with Section 6: Monetization Strategies & Tips?

Here’s **Section 6: Monetization Strategies & Tips** for your OneChurch project.

---

# OneChurch Fullstack Guide

### Section 6: Monetization Strategies & Tips

---

## 💵 PART 6: MONETIZATION STRATEGIES

Building a sustainable platform means considering how to generate revenue while serving your community. Here are some monetization ideas for **OneChurch**:

---

### 1. Premium Subscriptions

Offer churches and organizations paid subscription plans with enhanced features such as:

- Custom branding (logos, themes)
- Advanced analytics on post engagement and events
- Unlimited event postings and media uploads
- Priority support and moderation tools
- Ability to create polls, surveys, or newsletters

**Implementation:**

- Integrate a payment gateway like **Stripe** or **PayPal**.
- Create subscription plans and manage user roles in your backend.
- Use Stripe Billing for recurring subscriptions and webhooks.

---

### 2. Donations & Sponsorships

Allow churches or users to receive donations through the platform.

- Enable a "Donate" button on church profiles.
- Partner with Christian ministries or organizations to sponsor content or events.
- Offer a platform sponsorship or featured listings.

---

### 3. Advertisement Placements

Carefully integrate ads that align with the mission:

- Promote Christian events, books, music, or services.
- Display banners or promoted posts for sponsors.
- Use ad networks or direct sponsorship agreements.

---

### 4. Marketplace & Event Ticketing

Expand to a marketplace where:

- Churches can sell merchandise, books, or event tickets.
- Users can register and pay for special church events or conferences.

---

- Basic features remain free.

### 5. Freemium Model

- Advanced tools and integrations are locked behind paid tiers.
- Examples: Bulk messaging, detailed analytics, premium event management.

---

### 6. Affiliate Marketing

Refer tools, resources, or services useful to churches and earn commissions.

- Christian book stores, ministry tools, event platforms.
- Integrate affiliate links in posts or resource pages.

---

### 7. Mobile App In-App Purchases

If you build a mobile app:

- Offer in-app purchases for premium content or subscriptions.
- Use Apple and Google in-app billing.

---

## 💡 Tips for Successful Monetization

- Keep core features accessible to build community.
- Clearly communicate benefits of premium plans.
- Maintain mission alignment: ensure ads and offers fit the values of your users.
- Start simple and gather user feedback before adding complex monetization.
- Use analytics to track what features users value most.

---

## 🛠 Tools & Platforms for Monetization

| Feature | Suggested Tools & Services |
| --- | --- |
| Payments & Subscriptions | Stripe, PayPal, Paddle |
| Donations | Tithe.ly, PayPal Donations |
| Ads | Google AdSense, Direct Sponsors |
| Marketplace Payments | Stripe Connect, PayPal Commerce |
| Affiliate Programs | Rewardful, Impact, FirstPromoter |

---

Would you like me to continue with **Section 7: Additional Features & Roadmap** or help with anything else?

Here’s **Section 7: Additional Features & Roadmap** for OneChurch.

---

# OneChurch Fullstack Guide

### Section 7: Additional Features & Roadmap

---

## 🚀 PART 7: ADDITIONAL FEATURES & FUTURE ROADMAP

Once your core social media platform is live and stable, consider adding these features to enhance user experience and grow your community.

---

### 1. Notifications System

- Real-time push notifications for:
    - New messages
    - Likes and comments on posts
    - Upcoming events reminders
    - New followers or connection requests
- Use **Web Push API**, Firebase Cloud Messaging, or third-party services like OneSignal.

---

### 2. Admin Dashboard

- For church admins to manage:
    - Members and roles
    - Content moderation (posts, comments)
    - Event approvals and analytics
- Use React Admin or build custom dashboards.

---

### 3. Church Directory & Map

- Allow users to search for churches by location or denomination.
- Show churches on an interactive map.
- Integrate Google Maps or Mapbox.

---

### 4. Group & Ministry Pages

- Create sub-groups for ministries, youth groups, bible studies.
- Allow members to join specific groups.
- Manage group events, discussions, and files.

---

### 5. Livestream Integration

- Embed livestreams of church services.
- Use platforms like YouTube Live, Vimeo, or a custom RTMP server.
- Notify users when livestreams start.

---

### 6. Attendance Tracking & Member Management

- Tools for churches to track event attendance.
- Manage member profiles, volunteer schedules, and giving history.
- Can evolve into a full Church Management System (ChMS).

---

### 7. Mobile App

- Build mobile apps with React Native or Flutter.
- Sync with backend APIs for seamless experience.
- Enable push notifications and offline capabilities.

---

### 8. Enhanced Privacy & Security

- Granular privacy controls for posts and profiles.
- GDPR and data protection compliance.
- Moderation tools and reporting.

---

### 9. Integration with Other Platforms

- Sync with calendar apps (Google Calendar, Outlook).
- Connect with popular church software and CRMs.
- Import/export data for easier onboarding.

---

## 📅 Suggested Roadmap Timeline

| Phase | Features | Timeline |
| --- | --- | --- |
| Phase 1 (MVP) | Core social feed, profiles, messaging, events | 1-3 months |
| Phase 2 | Media uploads, real-time chat, calendar sync | 4-6 months |
| Phase 3 | Admin dashboard, notifications, groups | 7-9 months |
| Phase 4 | Livestream, attendance tracking, mobile app | 10-12 months |
| Phase 5 | Monetization, analytics, marketplace | 12+ months |

---

Would you like me to help create code snippets or design ideas for any of these features? Or shall we work on finalizing your project documentation?

Got it! Here’s a focused plan with essential **code snippets and explanations** to get your **MVP** solid and functional for OneChurch:

---

# OneChurch MVP Essentials: Key Code Snippets & Guidance

---

## 1. User Authentication (Using Clerk)

**Frontend Setup:**

```bash
npm install @clerk/clerk-react

```

In `main.jsx`:

```jsx
import { ClerkProvider } from '@clerk/clerk-react';

const clerkFrontendApi = "your-clerk-frontend-api";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider frontendApi={clerkFrontendApi}>
    <App />
  </ClerkProvider>
);

```

Protect routes in `App.jsx`:

```jsx
import { SignedIn, SignedOut, SignIn, SignUp } from '@clerk/clerk-react';

function App() {
  return (
    <>
      <SignedIn>
        <Routes>
          <Route path="/" element={<Feed />} />
          {/* other routes */}
        </Routes>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </>
  );
}

```

---

## 2. Backend Models (Prisma)

`schema.prisma` (simplified MVP):

```
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String?
  isChurch    Boolean  @default(false)
  posts       Post[]
  followers   Follower[] @relation("UserFollowers")
  following   Follower[] @relation("UserFollowing")
}

model Post {
  id        String   @id @default(cuid())
  authorId  String
  content   String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [authorId], references: [id])
  likes     Like[]
  comments  Comment[]
}

model Like {
  id      String @id @default(cuid())
  postId  String
  userId  String
  post    Post   @relation(fields: [postId], references: [id])
  user    User   @relation(fields: [userId], references: [id])
}

model Comment {
  id        String   @id @default(cuid())
  postId    String
  userId    String
  content   String
  createdAt DateTime @default(now())
  post      Post     @relation(fields: [postId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
}

model Follower {
  id          String @id @default(cuid())
  followerId  String
  followingId String
  follower    User   @relation("UserFollowing", fields: [followerId], references: [id])
  following   User   @relation("UserFollowers", fields: [followingId], references: [id])
}

```

---

## 3. Backend API Example (Express + Prisma)

Basic posts endpoint:

```
app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      likes: true,
      comments: true,
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const { authorId, content } = req.body;
  const post = await prisma.post.create({
    data: { authorId, content }
  });
  res.json(post);
});

```

---

## 4. Frontend: Fetch & Display Posts (React)

```jsx
import { useState, useEffect } from 'react';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://your-backend.com/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="post-card">
          <h3>{post.user.name || "Anonymous"}</h3>
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

```

---

## 5. Real-Time Messaging (Socket.IO MVP)

Backend snippet:

```
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('message', msg => {
    io.emit('message', msg);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

```

Frontend snippet:

```jsx
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://your-backend.com');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('message', msg => setMessages(prev => [...prev, msg]));
    return () => socket.off('message');
  }, []);

  const sendMessage = () => {
    socket.emit('message', input);
    setInput('');
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => <p key={i}>{msg}</p>)}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

```
---

## 6. Basic Event Posting (Backend Model + API)

Add this to your Prisma schema:

```
model Event {
  id          String   @id @default(cuid())
  churchId    String
  title       String
  description String?
  startTime   DateTime
  endTime     DateTime
  createdAt   DateTime @default(now())
  church      User     @relation(fields: [churchId], references: [id])
}

```

API endpoints example:

```
app.get('/events', async (req, res) => {
  const events = await prisma.event.findMany({ orderBy: { startTime: 'asc' } });
  res.json(events);
});

app.post('/events', async (req, res) => {
  const { churchId, title, description, startTime, endTime } = req.body;
  const event = await prisma.event.create({
    data: { churchId, title, description, startTime: new Date(startTime), endTime: new Date(endTime) }
  });
  res.json(event);
});

```

---

### Summary

- User authentication is set up using Clerk for fast, secure auth.
- Backend Prisma models cover users, posts, comments, likes, followers, and events.
- Basic API endpoints for posts, events, and real-time messaging.
- React frontend fetches and displays posts and includes real-time chat.
- You have a solid base MVP with core features ready to build on!