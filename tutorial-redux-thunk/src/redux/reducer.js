import { combineReducers } from 'redux'

const postReducer = (oldState = [], action) => {
  switch (action.type) {
    case 'FETCHED_POSTS':
      return action.posts
    default:
      return oldState
  }
}

const loadingReducer = (oldState = false, action) => {
  switch (action.type) {
    case 'FETCHED_POSTS':
      return false
    case 'LOADING_POSTS':
      return true
    default:
      return oldState
  }
}

const rootReducer = combineReducers({
  posts: postReducer,
  loading: loadingReducer,
})

export default rootReducer
