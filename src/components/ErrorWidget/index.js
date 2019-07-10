import React from 'react'
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap'
import { groupBy } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faExclamationCircle,
  faInfoCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

import './index.css'

const getIcon = (severity) => {
  switch (severity) {
    case 'error':
      return faTimesCircle
    case 'warning':
      return faExclamationCircle
    case 'message':
      return faInfoCircle
    default:
      return faQuestionCircle
  }
}

const Error = ({ message, severity }) =>
  <li className="mb-2">
    {message || 'Missing error message'}
    <FontAwesomeIcon
      icon={getIcon(severity)}
      className="float-right"
      style={{
        position: 'relative',
        top: '4px',
        opacity: 0.25,
      }}
    />
  </li>

const FileErrors = ({ file, errors }) =>
  <ListGroupItem>
    <Row>
      <Col md="4">
        <code className="text-dark">
          { file }
        </code>
      </Col>
      <Col>
        <ul className="list-unstyled error-list">
        {
          errors.map(
            (e, i) => <Error key={`file-error-${file}-${i}`} {...e} />
          )
        }
        </ul>
      </Col>
    </Row>
  </ListGroupItem>

const ErrorWidget = ({ errors }) => {
  const groupedErrors = groupBy(errors, e => e.file)

  return (
    <ListGroup flush>
      {
        Object.entries(groupedErrors)
          .map(([file, errors], i) =>
            <FileErrors
              key={`error-${ i }`}
              file={file}
              errors={errors}
            />
          )
      }
    </ListGroup>
  )
}

export default ErrorWidget
