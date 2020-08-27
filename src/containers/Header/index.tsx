import React, { useState } from 'react'
import { Container, Navbar, Button, Nav } from 'react-bootstrap'
import SignedInLinks from './SignedInLinks'

import PathModalForm from '../ModalForm/ModalForm'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Redirect } from 'react-router-dom'
import history from '../../history/history'

const Header: React.FC = () => {
  const [modalShow, setModalShow] = useState(false)
  const auth1 = useSelector((state: RootState) => state.firebase.auth)
  const profile = useSelector((state: RootState) => state.firebase.profile)

  const links = auth1.uid && <SignedInLinks {...profile} />

  if (!auth1.uid) return <Redirect to="/login" />
  return (
    <Navbar collapseOnSelect expand="lg" className="p-0 align-items-center">
      <Container className="border-bottom border-dark px-0 py-3">
        <a
          style={{ marginBottom: '0' }}
          onClick={() => {
            history.push('/')
          }}
        >
          <Navbar.Brand>
            <img
              alt="Logo"
              src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/arrows-alt-256.png"
              width="25"
              height="25"
              className="d-inline-block align-middle"
            />{' '}
            Saunter
          </Navbar.Brand>
        </a>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {links}
            <Button className="" onClick={() => setModalShow(true)}>
              Add path
            </Button>
            <PathModalForm
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
