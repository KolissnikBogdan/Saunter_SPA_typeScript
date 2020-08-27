import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import itemReducer from './itemReducer'
import authReducer from './authReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  itemDescript: itemReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

export default rootReducer
