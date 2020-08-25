import React, { useState } from 'react'
import { Container, Navbar, Button, Nav } from 'react-bootstrap'
import SignedInLinks from './SignedInLinks'

import PathModalForm from '../ModalForm/ModalForm'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Redirect } from 'react-router-dom'

const Header: React.FC = () => {
  const [modalShow, setModalShow] = useState(false)
  const auth = useSelector((state: RootState) => state.firebase.auth);
  const profile = useSelector((state: RootState) => state.firebase.profile);

  const links = auth.uid && <SignedInLinks {...profile}/>;

  if (!auth.uid) return <Redirect to='/login' />
  return (
    <Navbar collapseOnSelect expand="lg" className="p-0">
      <Container className="border-bottom border-dark px-0 py-3">
        <Navbar.Brand href="/">
          <img
            alt="Logo"
            src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/arrows-alt-256.png"
            width="25"
            height="25"
            className="d-inline-block align-top"
          />{' '}
          Saunter
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {links}
            <Button className="" onClick={() => setModalShow(true)}>Add path</Button>
            <PathModalForm show={modalShow} onHide={() => setModalShow(false)} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
