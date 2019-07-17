import Ajv from 'ajv'
import { detect as detectEncoding } from 'jschardet'

import { getFile } from '../util/fs'
import { detectPrefix, stripPrefix } from '../util/prefix'
import { description as descriptionSchema } from './schema'

const description_present = (files, { prefix }) =>
  // A top-level file is called dataset_description.json
  getFile('/dataset_description.json', files, prefix) !== undefined
    ? undefined
    : {
        message: 'No dataset description found',
        file: '/dataset_description.json',
        severity: 'error',
      }

const description_matches_specification = async (files, { prefix }) => {
  // TODO: Because we're checking for the presence of the file
  // here anyway, we might collapse this check with the one above
  const description = getFile('/dataset_description.json', files, prefix)
  if (description) {
    // Load contents
    const contents = await description.text()

    // Decode JSON
    let data
    try {
      data = JSON.parse(contents)
    } catch (e) {
      // TODO: We could probably provide more useful information
      // (i.e. JSON linting) here
      return {
        message: 'Description is not valid JSON',
        file: '/dataset_description.json',
        severity: 'error'
      }
    }

    // Validate according to schema
    const validator = new Ajv({ allErrors: true })
    const match = validator.validate(
      descriptionSchema,
      data
    )

    // Provide feedback
    if (!match) {
      return {
        message: 'Description does not match specification',
        file: '/dataset_description.json',
        severity: 'error',
        details: validator.errors,
      }
    }
  }
}

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

const encoding_utf8 = (files, { prefix }) =>
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

const filenames_alphanumeric = (files, { prefix }) =>
  // Check whether the file names are alphanumeric.
  // If the file path matches, everything is ok (return undefined),
  // otherwise return an error including further data
  files.map(
    f => /^[a-zA-Z0-9_\-/.]+$/g.test(f.path)
      ? undefined
      : {
          message: 'Non-alphanumeric file path',
          file: stripPrefix(f.path, prefix),
          severity: 'error',
        }
  )

const checks = [
  description_present,
  description_matches_specification,
  encoding_utf8,
  filenames_alphanumeric,
]

const validate = async (files) => {
  // Supply some metadata around the files
  const options = {
    prefix: detectPrefix(files)
  }

  // Run all of the checks for all of the files
  // (this happens asyncronously)
  const results = (await Promise.all(
    checks.map(check => check(files, options))
  )).flat()

  // Filter non-errors (undefined)
  return results.filter(e => e !== undefined)
}

export default validate
