import React from 'react'
import { CardBody } from 'reactstrap'

const ErrorWidget = ({ errors }) =>
  <CardBody>
    <ul>
      {
        errors.map((e, i) =>
          <li key={`error=${ i }`}>
            { e.message || 'Missing error message' }
          </li>
        )
      }
    </ul>
  </CardBody>

export default ErrorWidget
