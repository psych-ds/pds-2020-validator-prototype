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

const Error = ({ message, severity, details=[] }) =>
  <li className="mb-2">
    <div>
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
    </div>
    <div>
      {
        details.map((d, i) =>
          <small key={`details-${i}`} className="d-block">
            { /*
              TODO: This is tightly coupled to the ajv output.
              Error messages should be preprocessed into a
              standardized format that is independent
              of their origin.
            */ }
            {
              d.dataPath === ''
                ? 'The file '
                : <><code>{ d.dataPath }</code>{' '}</>
            }
            { d.message }
          </small>
        )
      }
    </div>
  </li>

const FileIssues = ({ file, issues }) =>
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
          issues.map(
            (e, i) => <Error key={`file-error-${file}-${i}`} {...e} />
          )
        }
        </ul>
      </Col>
    </Row>
  </ListGroupItem>

const ErrorWidget = ({ issues }) => {
  const groupedIssues = groupBy(issues, e => e.file)

  return (
    <ListGroup flush>
      {
        Object.entries(groupedIssues)
          .map(([file, issues], i) =>
            <FileIssues
              key={`error-${ i }`}
              file={file}
              issues={issues}
            />
          )
      }
    </ListGroup>
  )
}

export default ErrorWidget
