import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import firebase from 'firebase/app'
import { createFirestoreInstance } from 'redux-firestore'

import store from 'store/index'
import NotFoundPages from '../Pages/NoFoundPage'
import MainPage from '../Pages/MainPage'
import Login from '../Pages/LoginPage'
import Register from '../Pages/RegisterPage'

const rrfProps = {
  firebase,
  config: {
    userProfile: 'users',
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/" component={MainPage}/>
            <Route component={NotFoundPages}/>
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
