import React, { useState } from 'react'

import { Card, CardHeader, CardBody, CardTitle, CardText,
  Button, Collapse } from 'reactstrap'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedo } from '@fortawesome/free-solid-svg-icons'

import UploadWidget from '../UploadWidget'
import ErrorWidget from '../ErrorWidget'

import validate from '../../logic/validation'

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

const Toolbar = ({errors, onReload}) =>
  <CardBody
    className="d-flex justify-content-between bg-light border-b"
  >
    <div className="pt-1">
      <strong>
        {errors.length}
        {errors.length > 1 ? ' issues' : ' issue'}
      </strong> found
    </div>
    <ReloadButton
      onClick={onReload}
    />
  </CardBody>

const HeaderContent = ({errors, active}) => {
  if (errors.length > 0) {
    return <>
      <CardTitle className="h4">
        Not quite there yet!
      </CardTitle>
      <CardText>
        There's a few things that we'll need you to fix.
      </CardText>
    </>
  } else if (errors.length === 0 && active) {
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
        Please drag and drop your Psych-DS folder here,
        or click to select it
      </CardText>
    </>
  }
}

const ValidationWidget = () => {
  const [errors, setErrors] = useState([])
  const [active, setActive] = useState(false)

  const color = getColor(errors, active)

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
          'border-bottom-0': errors.length === 0,
          'rounded-bottom': errors.length === 0,
        })}
      >
        <UploadWidget
          onDrop={ async (files) => {
            // Run validation
            const newErrors = await validate(files)

            // Update state
            // (TODO: At some point, there might need to be
            // and intermediate state that is visible while
            // the data are being processed)
            setActive(true)
            setErrors(newErrors)
          }}
          className="text-center py-3"
        >
          <HeaderContent
            errors={errors}
            active={active}
            onReset={() => {
              setActive(false)
              setErrors([])
            }}
          />
        </UploadWidget>
      </CardHeader>
      <Collapse isOpen={errors.length > 0}>
        <Toolbar
          errors={errors}
          onReload={() => {
            setActive(false)
            setErrors([])
          }}
        />
        <ErrorWidget errors={errors} />
      </Collapse>
    </Card>
  )
}

export default ValidationWidget
