import React from 'react'
import { Container } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom'

import PathItems from '../PathsList/PathItems'

const MainPage: React.FC = () => {
  return (
    <Container className="mt-2">
      <PathItems />
    </Container>
  )
}

export default MainPage