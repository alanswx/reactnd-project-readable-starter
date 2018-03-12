import {combineReducers} from 'redux'
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
  UPDATE_POST,
  SET_POSTS,
  UPDATE_COMMENT
} from '../actions'


// AJS TODO -- THIS IS BROKEN -- loop through the state, until we match the id

function posts (state={},action) {
  switch(action.type){
    case UPVOTE_POST:
    //console.log(state)


    for (const [key, value] of Object.entries(state)) {
      //console.log(key)
      //console.log(value)
      if (value.id===action.postid)
      {
        value.voteScore++
      }
     }
    return state

    case DOWNVOTE_POST:
      for (const [key, value] of Object.entries(state)) {
        //console.log(key)
        //console.log(value)
        if (value.id===action.postid)
        {
          value.voteScore--
        }
       }
      return state
    case UPDATE_POST:
      state[action.post.id] = {
        ...action.post
      }
      return {
        ...state
      }


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
  switch(action.type){
    case UPDATE_COMMENT:
    default:
      return state
  }
}
/*
function food (state={}, action){
  switch (action.type){
    case ADD_RECIPE:
    const { recipe } = action

    return {
      ...state,
       [recipe.label]: recipe
    }
    default:
      return state
  }
}
const initialCalendarState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  monday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  tuesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  wednesday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  thursday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  friday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
  saturday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
}

function calendar (state = initialCalendarState, action) {
  const { day, recipe, meal } = action

  switch (action.type) {
    case ADD_RECIPE :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label,
        }
      }
    case REMOVE_FROM_CALENDAR :
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: null,
        }
      }
    default :
      return state
  }
}
*/
export default combineReducers({
  posts,
  comment
})
