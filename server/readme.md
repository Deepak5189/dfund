#   DFund - Server

This Readme file records the progress of the DFund server

##  Tech Stack
-   Node.js (runtime for the server)
-   express (Library for easier implementation of the server)
-   PostgreSQL (Database for storing all the data related to the application)
-   Prisma (Used for handling data inside the database)
-   MongoDB (MongoDB was used in the initial steps of development then switched to postgreSQL)

##  Features

The features of the application will be built in the order they are apecified here

### Authentication

There are 2 different types of users in the application:
1.  General User (genUser)
2. Admin User (adminUser) [Not implemented yet]

### Campaign logic

Any user can create a campaign. there is a form available to create campaign
THis is the campaign flow:
1.  Fill the form and submit the campaign
2.  By default, all the campaigns are Draft
3.  Once submitted, Admin's approval is required before sending the campaign to the user's feed
4.  Once the campaign get's approval, it reaches the general users who then can fund it
5.  A campaign remains in the feed until either it meets it's goal or past it's deadline post which it becomes inactive/over
6.  An inactive/over campaign will be visible to only creator and the users that funded it

API endpoints created:
1. POST /posts/create-post  |   To create a new Campaign
2. GET /posts               |   To fetch all the Campaigns
3. GET /posts/:id           |   To fetch a single Campaign with all the info

### Likes and Comment

Likes are not implemented yet.

-   initial top level comments will be fetched with the campaign details.
-   write a comment functionality is provided with `POST /comments/` end point
-   These are the things required in the request body:
-   1.  campaignId
-   2.  content
-   3.  parentCampaignId (If it is a reply instead)
-   the replies to a parent comment can be fetched from the endpoint `GET /comment/<parent-comment-id>`.
-   -   This will return the list of replies to the given parent comment.
-   Pagination will be implemented at a later stage

### Payment

users can choose to donate to a campaign



### Chat