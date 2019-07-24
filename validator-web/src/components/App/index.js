import React from 'react'

import { Container, Row, Col } from 'reactstrap'

import Header from '../Header'
import ValidationWidget from '../ValidationWidget'

const App = () =>
  <Container>
    <Row>
      <Col className="text-center pt-5">
        <Header />
      </Col>
    </Row>
    <Row>
      <Col className="py-4">
        <ValidationWidget />
      </Col>
    </Row>
  </Container>

export default App
