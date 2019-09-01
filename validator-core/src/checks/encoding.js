import { detect as detectEncoding } from 'jschardet'
import { makeCheck } from '../util'

const fileToRawString = async (file) => {
  // JS encodes files as UTF-8 automagically, making
  // character set detection very hard. Herein, we
  // circumvent the automatic file loading to create
  // a raw string from the file contents.

  // Load the raw data into an array
  const buffer = await file.arrayBuffer()
  const data = new Uint8Array(buffer)

  // Convert data array to string
  let string = ''
  for (let i = 0; i < data.length; i++) {
    string += String.fromCharCode(data[i])
  }
  return string
}

const file_encoding_utf8 = async ([path, file]) => {
  const content = await fileToRawString(file)
  const { encoding, confidence } = detectEncoding(content)

  // Complain about non-standard encoding
  return ['ascii', 'UTF-8'].includes(encoding)
    ? undefined
    : {
        message: 'File not encoded as UTF-8',
        file: path,
        severity: 'error',
        details: [
          { message: `It looks like it's ${ encoding }, but we can't be sure; confidence is at ${ Math.round(confidence * 100) }%` }
        ]
      }
}

export const encoding_utf8 = makeCheck(file_encoding_utf8, {
  // TODO: Reflect on better file filter for this check
  // (do we want to check metadata files too, and/or limit
  // checks to .json and .tsv in the raw_data folder)
  glob: 'raw_data/**/*',
  mode: 'per_file'
})
