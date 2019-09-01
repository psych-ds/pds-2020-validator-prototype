import Ajv from 'ajv'

import { description as descriptionSchema } from './schema'
import { makeCheck } from '../../util'

export const description_present = (files) =>
  // A top-level file is called dataset_description.json
  files['dataset_description.json'] !== undefined
    ? undefined
    : {
        message: 'No dataset description found',
        file: 'dataset_description.json',
        severity: 'error',
      }

const _description_matches_specification = async ([_, description]) => {
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
      file: 'dataset_description.json',
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
      file: 'dataset_description.json',
      severity: 'error',
      details: validator.errors,
    }
  }
}

export const description_matches_specification = makeCheck(
  _description_matches_specification, {
  // TODO: Extend to nested per-file metadata
  glob: 'dataset_description.json',
  mode: 'per_file',
})
