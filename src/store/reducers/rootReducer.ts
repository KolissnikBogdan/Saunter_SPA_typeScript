import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import itemReducer, {IState} from './itemReducer'

const rootReducer = combineReducers({
  itemDescript: itemReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})

export default rootReducer
