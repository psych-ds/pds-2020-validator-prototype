import React, { useState } from 'react'

import { Card, CardHeader, CardBody } from 'reactstrap'

import UploadWidget from '../UploadWidget'
import ErrorWidget from '../ErrorWidget'

import validate from '../../logic/validation'

import './index.css'

const ValidationWidget = () => {
  const [errors, setErrors] = useState([])

  return (
    <Card>
      <CardHeader className="bg-white">
        <UploadWidget
          onDrop={ files => {
            // Clear the list of errors
            setErrors([])

            // Run validation
            const newErrors = validate(files)

            // Update errors
            setErrors(newErrors)
          } }
        />
      </CardHeader>
      {
        errors.length > 0 &&
          <CardBody>
            <ErrorWidget
              errors={ errors }
            />
          </CardBody>
      }
    </Card>
  )
}

export default ValidationWidget
