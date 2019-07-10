import React from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

const getColor = (severity) => {
  switch (severity) {
    case 'error':
      return 'danger'
    case 'warning':
      return 'warning'
    case 'message':
      return 'info'
    default:
      return 'light'
  }
}

const ErrorWidget = ({ errors }) =>
  <ListGroup flush>
    {
      errors.map((e, i) =>
        <ListGroupItem
          key={`error=${ i }`}
          color={getColor(e.severity)}
        >
          { e.message || 'Missing error message' }
        </ListGroupItem>
      )
    }
  </ListGroup>

export default ErrorWidget
