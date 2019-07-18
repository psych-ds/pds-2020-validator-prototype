import { detect as detectEncoding } from 'jschardet'

import { stripPrefix } from '../../util/prefix'

const fileToRawString = async (file) => {
  // JS encodes files as UTF-8 automagically, making
  // character set detection very hard. Herein, we
  // circumvent the automatic file loading to create
  // a raw string from the file contents.

  // Load the raw data into an array
  const buffer = await file.arrayBuffer()
  const data = new Uint8Array(buffer)

  // Convert data array to string
  return String.fromCharCode.apply(null, data)
}

export const encoding_utf8 = (files, { prefix }) =>
  Promise.all(files.map(
    async f => {
      const content = await fileToRawString(f)
      const { encoding, confidence } = detectEncoding(content)

      // Complain about non-standard encoding
      return ['ascii', 'UTF-8'].includes(encoding)
        ? undefined
        : {
            message: 'File not encoded as UTF-8',
            file: stripPrefix(f.path, prefix),
            severity: 'error',
            details: [
              { message: `It looks like it's ${ encoding }, but we can't be sure; confidence is at ${ Math.round(confidence * 100) }%` }
            ]
          }
    }
  ))
