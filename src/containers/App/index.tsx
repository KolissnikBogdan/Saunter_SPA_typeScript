import React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'

import firebase from 'firebase/app'

import NotFoundPages from '../Pages/NoFoundPage'
import Login from '../Pages/LoginPage'
import Register from '../Pages/RegisterPage'
import PrivateRoute from '../Pages/PrivatePage'
import Dashboard from '../Pages/Dashboard'

import store from 'store/index'
import history from '../../history/history'

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
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router history={history}>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route component={NotFoundPages} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
