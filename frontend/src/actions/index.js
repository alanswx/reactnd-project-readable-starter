export const UPVOTE_POST='UPVOTE_POST'
export const DOWNVOTE_POST='DOWNVOTE_POST'
export const UPDATE_POST='UPDATE_POST'
export const SET_POST='SET_POST'
export const UPDATE_COMMENT='UPDATE_COMMENT'


export function upvotePost ( {postid}){
  return {
    type: UPVOTE_POST,
    postid,
  }
}
export function downvotePost ( {postid}){
  return {
    type: DOWNVOTE_POST,
    postid,
  }
}

export function updatePost (post){
  return {
    type: UPDATE_POST,
    post,
  }
}export function setPost (post){
  return {
    type: SET_POST,
    post,
  }
}

export function updateComment ({comment,post}){
  return {
    type: UPDATE_COMMENT,
    post,
    comment
  }
}
