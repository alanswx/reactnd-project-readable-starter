import {combineReducers} from 'redux'
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
  DELETE_POST,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  DELETE_COMMENT,
  UPDATE_POST,
  SET_POSTS,
  UPDATE_COMMENT,
  SET_COMMENTS,
  CLEAR_COMMENTS
} from '../actions'


// AJS TODO -- THIS IS BROKEN -- loop through the state, until we match the id

function posts (state={},action) {
  let newState = {...state}
  switch(action.type){
    case UPVOTE_POST:
      for (const value of Object.values(newState)) {
      if (value.id===action.postid)
      {
        value.voteScore++
      }
     }
    return newState

    case DOWNVOTE_POST:
      for (const value of Object.values(newState)) {
        if (value.id===action.postid)
        {
          value.voteScore--
        }
       }
      return newState
    case UPDATE_POST:
      state[action.post.id] = {
        ...action.post
      }
      return {
        ...state
      }

    case DELETE_POST:
    for (const value of Object.values(newState)) {
      if (value.id===action.postid)
      {
        value.deleted=true
      }
     }
     return newState
    case SET_POSTS:
     const {posts }= action
     return {
       ...posts
     }
    default:
      return state
  }
}

function comment(state={},action){
  let newState = {...state}
  switch(action.type){
    case UPVOTE_COMMENT:
    for (const value of Object.values(newState)) {
      if (value.id===action.commentid)
      {
        value.voteScore++
      }
     }
    return newState

    case DOWNVOTE_COMMENT:
    for (const value of Object.values(newState)) {
      if (value.id===action.commentid)
      {
        value.voteScore--
      }
     }
    return newState

    case DELETE_COMMENT:
    for (const value of Object.values(newState)) {
      if (value.id===action.commentid)
      {
        value.deleted=true
      }
     }
    return newState



    case SET_COMMENTS:
     let newComments = {}
     for (const value of Object.values(action.data)) {
       newComments[value.id]=value
     }
     return newComments
     case CLEAR_COMMENTS:
       return {}
    case UPDATE_COMMENT:
      newState[action.comment.id]=action.comment
      return newState
    default:
      return state
  }
}


export default combineReducers({
  posts,
  comment
})
