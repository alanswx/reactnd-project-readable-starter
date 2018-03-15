import {api} from '../utils/ReadableAPI.js'
import {headers} from '../utils/ReadableAPI.js'

export const UPVOTE_POST='UPVOTE_POST'
export const DOWNVOTE_POST='DOWNVOTE_POST'
export const DELETE_POST='DELETE_POST'
export const UPVOTE_COMMENT='UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT='DOWNVOTE_COMMENT'
export const DELETE_COMMENT='DELETE_COMMENT'
export const UPDATE_POST='UPDATE_POST'
export const SET_POSTS='SET_POSTS'
export const SET_COMMENTS='SET_COMMENTS'
export const CLEAR_COMMENTS='CLEAR_COMMENTS'
export const UPDATE_COMMENT='UPDATE_COMMENT'


export function upvotePost ( postid){

  return(dispatch) => {
    fetch(`${api}/posts/${postid}`,  { method: 'POST', body: JSON.stringify({option:'upVote'}), headers } )
      .then( dispatch({
          type: UPVOTE_POST,
          postid,
        }))
  }
}

export function downvotePost ( postid){
  return(dispatch) => {
    fetch(`${api}/posts/${postid}`,  { method: 'POST', body: JSON.stringify({option:'downVote'}), headers } )
      .then( dispatch({
          type: DOWNVOTE_POST,
          postid,
        }))
  }
}

export function deletePost ( postid){
/*
DELETE /posts/:id
  USAGE:
    Sets the deleted flag for a post to 'true'.
    Sets the parentDeleted flag for all child comments to 'true'.
*/
  return(dispatch) => {
    fetch(`${api}/posts/${postid}`,  { method: 'DELETE', headers } )
      .then( dispatch({
          type: DELETE_POST,
          postid,
        }))
  }
}
export function deleteComment ( commentid){

  return(dispatch) => {
    fetch(`${api}/comments/${commentid}`,  { method: 'DELETE', headers } )
      .then( dispatch({
          type: DELETE_COMMENT,
          commentid,
        }))
  }
}

export function upvoteComment ( commentid){

  return(dispatch) => {
    fetch(`${api}/comments/${commentid}`,  { method: 'POST', body: JSON.stringify({option:'upVote'}), headers } )
      .then( dispatch({
          type: UPVOTE_COMMENT,
          commentid,
        }))
  }
}

export function commentsForNewPost(postid) {
  return(dispatch) => {
    fetch(`${api}/posts/${postid}/comments`,  {  headers } )
      .then(res => res.json())
      .then(data => dispatch({
          type: SET_COMMENTS,
          data,
        }))
  }

}

export function clearComments (){
  return {
    type: CLEAR_COMMENTS
  }
}


export function downvoteComment ( commentid){
  return(dispatch) => {
    fetch(`${api}/comments/${commentid}`,  { method: 'POST', body: JSON.stringify({option:'downVote'}), headers } )
      .then( dispatch({
          type: DOWNVOTE_COMMENT,
          commentid,
        }))
  }
}

export function updatePost (post){
  /*     PUT /posts/:id
        USAGE:
          Edit the details of an existing post
        PARAMS:
          title - String
          body - String
          */
  return(dispatch) => {
    fetch(`${api}/posts/${post.id}`,  { method: 'PUT', body: JSON.stringify({
        body:post.body,
        title: post.title

      }), headers } )
      .then( dispatch({
        type: UPDATE_POST,
        post
        }))
  }
}
export function newPost (post){

/*
POST /posts
  USAGE:
    Add a new post

  PARAMS:
    id - UUID should be fine, but any unique id will work
    timestamp - timestamp in whatever format you like, you can use Date.now() if you like
    title - String
    body - String
    author - String
    category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

*/
return(dispatch) => {
fetch(`${api}/posts/`,  { method: 'POST', body: JSON.stringify({
    id: post.id,
    timestamp: Date.now(),
    author: post.author,
    body:post.body,
    title: post.title,
    category: post.category
  }), headers } )
  .then( dispatch({
    type: UPDATE_POST,
    post
    }))
  }
}




export function setPosts (posts){
  return {
    type: SET_POSTS,
    posts,
  }
}

export function updateComment (comment){
/*
  PUT /comments/:id
    USAGE:
      Edit the details of an existing comment

    PARAMS:
      timestamp: timestamp. Get this however you want.
      body: String
  */
  return(dispatch) => {
    fetch(`${api}/comments/${comment.id}`,  { method: 'PUT', body: JSON.stringify({timestamp: Date.now(), body:comment.body}), headers } )
      .then( dispatch({
        type: UPDATE_COMMENT,
        comment
        }))
  }

}export function newComment (comment){
/*
POST /comments
USAGE:
  Add a comment to a post

PARAMS:
  id: Any unique ID. As with posts, UUID is probably the best here.
  timestamp: timestamp. Get this however you want.
  body: String
  author: String
  parentId: Should match a post id in the database.

  */
  return(dispatch) => {
    fetch(`${api}/comments/`,  { method: 'POST', body: JSON.stringify({
        id: comment.id,
        timestamp: Date.now(),
        body:comment.body,
        author: comment.author,
        parentId: comment.parentId

      }), headers } )
      .then( dispatch({
        type: UPDATE_COMMENT,
        comment
        }))
  }

}
