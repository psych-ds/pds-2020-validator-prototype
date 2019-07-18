import Ajv from 'ajv'

import { description as descriptionSchema } from './schema'

export const description_present = (files) =>
  // A top-level file is called dataset_description.json
  files['dataset_description.json'] !== undefined
    ? undefined
    : {
        message: 'No dataset description found',
        file: 'dataset_description.json',
        severity: 'error',
      }

export const description_matches_specification = async (files) => {
  // TODO: Because we're checking for the presence of the file
  // here anyway, we might collapse this check with the one above
  const description = files['dataset_description.json']
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
}
