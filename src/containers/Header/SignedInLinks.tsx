import React from 'react'
import { signOut } from '../../actions/authActions'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import { selectItem } from '../../actions/progectActions'

const SignedInLinks = ({ firstName, lastName }: any) => {
  const dispatch = useDispatch()

  const handleClick = (e: any) => {
    e.preventDefault()
    dispatch(selectItem(null))
    dispatch(signOut())
  }

  return (
    <>
      <Navbar.Text className="mr-lg-2">
        {firstName + ' ' + lastName}
      </Navbar.Text>
      <Button variant="outline-warning" className="mr-lg-2 mb-lg-0 mb-md-2 mb-sm-2" onClick={handleClick}>
        LogOut
      </Button>
    </>
  )
}

export default SignedInLinks