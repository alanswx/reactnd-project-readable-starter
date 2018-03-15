# Readable Project

This project is a simplified version of a message board. It allows users to add and edit posts and comments. It also let's you tag posts with 1 of 3 categories.

This was a great project to learn Redux. My first pass I wasn't using the thunk pattern, I was trying to do the update in the code, and call a normal action afterwards.  This became clunky, and the code seemed a lot more straightforward once I started using thunks. 

There are some obvious shortcomings:

+ State is kept locally, and the server doesn't push changes - this structure wouldn't work for a multi-user environment
+ no security or login information, so users can be added
+ Assumes things fit in memory and are fast, there is no concept of pagination to get the first n messages, and/or comments
+ no threading of comments

## Redux State Design
+ posts
	+ a global list of all posts in system
+ comments
	+ comments for the current post (should this be component state?)

## Component State
- Inside App
	- categories
- Inside CommmentList
	+ editList: this contains which comments are in edit mode
	+ comments: a local copy of the comments to hold the edits before save is pressed for managed forms


## How To Run

Open two terminal windows. In the first:

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, install and run the react front end
    - `npm install `
    - `npm start`

## API Server

Information about the API server and how to use it can be found in its [README file](api-server/README.md).
