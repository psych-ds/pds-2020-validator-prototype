import React from 'react'
import Dropzone from 'react-dropzone'

import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Psych-DS validator</h1>
      </header>
      <main>
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </main>
    </div>
  );
}

export default App;
