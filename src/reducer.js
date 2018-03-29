import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import web3Reducer from './util/web3/web3Reducer'
import message from './message/messageReducer'

const reducer = combineReducers({
  routing: routerReducer,
  web3: web3Reducer,
  message:message
})

export default reducer
