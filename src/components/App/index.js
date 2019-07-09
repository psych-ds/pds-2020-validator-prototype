import React from 'react'
import Dropzone from 'react-dropzone'

import './App.css'
import { Container, Row, Col,
  Card, CardBody, CardTitle, CardText } from 'reactstrap'

import validate from '../../logic/validation'

const App = () =>
  <Container className="app-container">
    <Row>
      <Col className="text-center py-4">
        <h1 className="h2">Psych-DS validator prototype</h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <Dropzone onDrop={validate}>
          {({getRootProps, getInputProps}) => (
            <Card className="text-center py-3">
              <CardBody {...getRootProps()}>
                <input {...getInputProps()} />
                <CardTitle className="h4">
                  Start validation
                </CardTitle>
                <CardText>
                  Please drag and drop your Psych-DS folder here,
                  or click to select it
                </CardText>
              </CardBody>
            </Card>
          )}
        </Dropzone>
      </Col>
    </Row>
  </Container>

export default App;
