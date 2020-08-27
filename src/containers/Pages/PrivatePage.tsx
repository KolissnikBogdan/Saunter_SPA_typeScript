import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import firebase from 'firebase/app'
import history from '../../history/history'

function PrivateRoute({ component: Component, ...rest }: any) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  let token2 = JSON.parse(localStorage.getItem('token') as string)

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) { // попробувати перенести створення токенів в екшени
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
      history.push('/login')
    }
  })

  //useEffect( () => () => console.log("unmount"), [] );

  return (
    <Route{...rest} render={props => (isLoggedIn && <Component/>)} />
  )
}

export default PrivateRoute
