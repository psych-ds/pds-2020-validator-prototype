import Ajv from 'ajv'

import { getFile, detectPrefix, stripPrefix } from './util'
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

const filenames_ascii = (files, { prefix }) =>
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
  filenames_ascii,
]

const validate = async (files) => {
  // Supply some metadata around the files
  const options = {
    prefix: detectPrefix(files)
  }

  // Run all of the checks for all of the files
  // (this happens asyncronously)
  const results = await Promise.all(
    checks.flatMap(check => check(files, options))
  )

  // Filter non-errors (undefined)
  return results.filter(e => e !== undefined)
}

export default validate
