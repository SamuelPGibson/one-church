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