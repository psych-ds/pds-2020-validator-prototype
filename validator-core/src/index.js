import {
  description_present,
  description_matches_specification
} from './checks/description'
import { encoding_utf8 } from './checks/encoding'
import { file_content } from './checks/data'
import { filenames_alphanumeric } from './checks/filenames'
import flat from 'core-js-pure/features/array/flat'

const checks = [
  description_present,
  description_matches_specification,
  encoding_utf8,
  filenames_alphanumeric,
  file_content
]

const validate = async (files, options={}) => {
  // Run all of the checks for all of the files
  // (this happens asyncronously)
  const results = await Promise.all(
    checks.map(check => check(files, options))
  )

  // Flatten and filter non-errors (undefined)
  return flat(results).filter(e => e !== undefined)
}

export default validate
