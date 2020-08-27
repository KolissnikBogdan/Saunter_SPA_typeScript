import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import MainPage from '../MainPage'
import Profile from '../Profile'
import Header from '../../Header'

const path = '/dashboard'

const Dashboard = () => {
  let localeStgUser = JSON.parse(localStorage.getItem('token') as string)

  if(!localeStgUser) { return <Redirect to={'/login'} />}
  return (
    <>
      <Header/>
      <Switch>
        <Route path={`${path}/profile`} component={Profile} />
        <Route exact path={`${path}`} component={MainPage} />
      </Switch>
    </>
  )
}
export default Dashboard
