import React from "react";
import { Container } from "react-bootstrap";
import Header from '../Header'
import PathItems from '../PathsList/PathItems'

const MainPage: React.FC = () => {
  return(
    <>
      <Header />
      <Container className="mt-2">
        <PathItems />
      </Container>
    </>
  )
}

export default MainPage;