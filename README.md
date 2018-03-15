# Readable Project

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
