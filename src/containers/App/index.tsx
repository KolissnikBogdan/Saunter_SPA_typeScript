import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase from 'firebase/app'
import { createFirestoreInstance } from 'redux-firestore'

import store from 'store/index'
import NotFoundPages from '../Pages/NoFoundPage'
import MainPage from '../Pages/MainPage'
import Login from '../Pages/LoginPage'
import Register from '../Pages/RegisterPage'
import useFirebaseAuthentication from '../../utils/hooks/useFirebaseAuthentication'

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
}

const App: React.FC = () => {
  let token = useFirebaseAuthentication(firebase)

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Switch>
            <Route exact path="/" render={props => token ? (<MainPage />) : (<Redirect to="/"/>)} />
            <Route path="/login" render={props => token ? (<Login />) : (<Redirect to="/"/>)} />
            <Route path="/register" render={props => token ? (<Register />) : (<Redirect to="/"/>)} />
            <Route component={NotFoundPages} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
