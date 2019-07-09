import { handleActions } from 'redux-actions'
import { INCREMENT, DECREMENT, FETCH_LIST } from '../types/active'

export default handleActions({
  [INCREMENT] (state) {
    return {
      ...state,
      num: state.num + 1
    }
  },
  [DECREMENT] (state) {
    return {
      ...state,
      num: state.num - 1
    }
  },
  [FETCH_LIST] (state, action) {
    console.log('active', action)
    return {
      ...state,
      list: action.payload
    }
  }
}, {
  num: 0,
  list: []
})