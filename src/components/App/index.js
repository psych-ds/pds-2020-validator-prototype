import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

import './App.css'
import { Container, Row, Col,
  Card, CardBody, CardTitle, CardText } from 'reactstrap'

import validate from '../../logic/validation'

const App = () => {
  const [errors, setErrors] = useState([])

  return <>
    <Container className="app-container">
      <Row>
        <Col className="text-center py-4">
          <h1 className="h2">Psych-DS validator prototype</h1>
        </Col>
      </Row>
      <Row>
        <Col className="py-4">
          <Dropzone
            onDrop={ files => {
              // Clear the list of errors
              setErrors([])

              // Run validation
              const newErrors = validate(files)

              // Update errors
              setErrors(newErrors)
            } }
          >
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
      <Row>
        <Col className="py-4">
          <ul>
            {
              errors.length > 0
                ? errors.map(e => <li>{ e.message }</li>)
                : <li>No errors so far</li>
            }
          </ul>
        </Col>
      </Row>
    </Container>
  </>
}

export default App;
