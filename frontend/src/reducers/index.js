import {combineReducers} from 'redux'
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
  UPDATE_POST,
  SET_POST,
  UPDATE_COMMENT
} from '../actions'

function post (state={},action) {
  switch(action.type){
    case UPVOTE_POST:
    case DOWNVOTE_POST:
    case UPDATE_POST:
    case SET_POST:
     const {post }= action
     return {
       ...post
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
  post,
  comment
})
