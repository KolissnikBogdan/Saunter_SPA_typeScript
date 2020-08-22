import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import itemReducer from './itemReducer'
import authReducer from './authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  itemDescript: itemReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

export default rootReducer
