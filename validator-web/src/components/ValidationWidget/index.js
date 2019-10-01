import React, { useState } from 'react'

import { Card, CardHeader, CardBody, CardTitle, CardText,
  Button, Collapse } from 'reactstrap'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo, faSun } from '@fortawesome/free-solid-svg-icons'

import UploadWidget from '../UploadWidget'
import ErrorWidget from '../ErrorWidget'

import validate from '../../logic'

import './index.css'

const getColor = (errors, active) => {
  if (errors.length > 0) {
    return 'warning'
  } else if (errors.length === 0 && active) {
    return 'success'
  } else {
    return 'primary'
  }
}

const ReloadButton = ({onClick}) =>
  <Button
    outline color="secondary" size="sm"
    style={{ fontWeight: 600 }}
    onClick={e => {
      e.stopPropagation()
      onClick(e)
    }}
  >
    <FontAwesomeIcon
      fixedWidth icon={faRedo}
    />{' '}
    Start over
  </Button>

const Toolbar = ({issues=[], onReload}) =>
  <CardBody
    className={classNames(
      "d-flex justify-content-between bg-light text-dark border-b",
      // Round bottom corners if the toolbar is the last
      // component within the card
      {'rounded-bottom': issues.length === 0}
    )}
  >
    <div className="pt-1">
      <strong>
        {issues.length}
        {issues.length === 1 ? ' issue' : ' issues'}
      </strong> found
    </div>
    <ReloadButton
      onClick={onReload}
    />
  </CardBody>

const HeaderContent = ({issues, busy, active}) => {
  if (busy) {
    return <FontAwesomeIcon fixedWidth
      icon={faSun} size="4x" spin
      style={{
        color: 'white',
        opacity: 0.5,
      }}
    />
  } else if (issues.length > 0) {
    return <>
      <CardTitle className="h4">
        Not quite there yet!
      </CardTitle>
      <CardText>
        There's a few things that we'll need you to fix.
      </CardText>
    </>
  } else if (issues.length === 0 && active) {
    return <>
      <CardTitle className="h4">
        Looks great!
      </CardTitle>
      <CardText>
        We couldn't find any problems (so far at least). Well done!
      </CardText>
    </>
  } else {
    return <>
      <CardTitle className="h4">
        Start validation
      </CardTitle>
      <CardText>
        Please drag and drop your Psych-DS folder here
      </CardText>
    </>
  }
}

const ValidationWidget = () => {
  const [issues, setIssues] = useState([])
  const [active, setActive] = useState(false)
  const [busy, setBusy] = useState(false)

  const color = getColor(issues, active)

  return (
    <Card
      color={color}
      inverse={['primary', 'success'].includes(color)}
    >
      <CardHeader
        className={classNames({
          // Remove bottom border if the issue list isn't visible
          // (this isn't easy in raw CSS, because the collapsible
          // element below is always present, therefore the
          // :last-child pseudo-class doesn't apply. At some point,
          // :has() will make this possible, but browser support
          // is still way out.)
          'border-bottom-0': !active,
          'rounded-bottom': !active,
        })}
      >
        <UploadWidget
          onDrop={ async (files) => {
            setBusy(true)

            // Run validation
            const newIssues = await validate(files)

            // Update state
            // (TODO: At some point, there might need to be
            // and intermediate state that is visible while
            // the data are being processed)
            setIssues(newIssues)
            setActive(true)
            setBusy(false)
          }}
          className="text-center py-3"
        >
          <HeaderContent
            issues={issues}
            busy={busy}
            active={active}
          />
        </UploadWidget>
      </CardHeader>
      <Collapse isOpen={active}>
        <Toolbar
          issues={issues}
          onReload={() => {
            setActive(false)
            setIssues([])
          }}
        />
        <ErrorWidget issues={issues} />
      </Collapse>
    </Card>
  )
}

export default ValidationWidget
