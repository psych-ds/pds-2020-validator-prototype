import React from 'react'
import Dropzone from 'react-dropzone'
import { CardTitle, CardText } from 'reactstrap'

const UploadWidget = ({ onDrop }) =>
  <Dropzone
    onDrop={onDrop}
  >
    {({getRootProps, getInputProps}) => (
      <div {...getRootProps()}>
        <div className="text-center py-3">
          <input {...getInputProps()} />
          <CardTitle className="h4">
            Start validation
          </CardTitle>
          <CardText>
            Please drag and drop your Psych-DS folder here,
            or click to select it
          </CardText>
        </div>
      </div>
    )}
  </Dropzone>

export default UploadWidget
