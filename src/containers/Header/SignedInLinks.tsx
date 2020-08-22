import React from 'react'
import { signOut } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

const SignedInLinks = (props: any) => {
  const dispatch = useDispatch()

  const handleClick = (e: any) => {
    e.preventDefault()
    dispatch(signOut())
  }

  return (
    <>
      <Button variant="outline-warning" onClick={handleClick}>
        LogOut
      </Button>
    </>
  )
}

export default SignedInLinks