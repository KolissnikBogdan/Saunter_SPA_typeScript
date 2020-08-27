import React from 'react'
import { Nav, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { signOut } from '../../actions/authActions'
import { selectItem } from '../../actions/progectActions'
import { RootState } from '../../store'

import history from '../../history/history'
import firebase from 'firebase/app'

const SignedInLinks = ({ firstName, lastName }: any) => {
  const dispatch = useDispatch()

  const handleClick = (e: any) => {
    e.preventDefault()
    dispatch(selectItem(null))
    dispatch(signOut())
  }

  /*const userFirestore = useSelector(
    (state: RootState) => state.user.profileChanges
  )*/

  const user = firebase.auth()?.currentUser

  let localeStgUser = JSON.parse(localStorage.getItem('token') as string)

  return (
    <>
      <Nav.Item className="mr-lg-2" as="li">
        <img
          src={user?.photoURL!}
          alt="User img"
          width="35"
          height="35"
          style={{ borderRadius: '50%', float: 'left' }}
        />
        <a onClick={() => history.push('/dashboard/profile')}>
          {' '}
          {(localeStgUser && localeStgUser.displayName) || firebase.auth().currentUser?.displayName}
        </a>
      </Nav.Item>
      <Button
        variant="outline-warning"
        className="mr-lg-2 mb-lg-0 mb-md-2 mb-sm-2"
        onClick={handleClick}
      >
        LogOut
      </Button>
    </>
  )
}

export default SignedInLinks
