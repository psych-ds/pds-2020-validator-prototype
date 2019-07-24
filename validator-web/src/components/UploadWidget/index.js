import React from 'react'
import Dropzone from 'react-dropzone'

const UploadWidget = ({ onDrop, children, className }) =>
  <Dropzone
    onDrop={onDrop}
  >
    {({getRootProps, getInputProps}) => (
      <div {...getRootProps()}>
        <div className={className}>
          <input {...getInputProps({ webkitdirectory: 'true' })} />
          { children }
        </div>
      </div>
    )}
  </Dropzone>

export default UploadWidget
