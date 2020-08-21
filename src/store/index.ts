import { createStore, applyMiddleware, compose } from 'redux'
import { getFirestore, reduxFirestore } from 'redux-firestore'

import thunk from 'redux-thunk'
import fbConfig from '../config/fbConfig'
import rootReducer from './reducers/rootReducer'

const middleware = [thunk.withExtraArgument({ getFirestore })]

 const root = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware), reduxFirestore(fbConfig))
);

export default root;

export type RootState = ReturnType<typeof rootReducer>