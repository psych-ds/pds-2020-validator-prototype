import {
  description_present,
  description_matches_specification
} from './checks/description'
import { encoding_utf8 } from './checks/encoding'
import { file_content } from './checks/content'
import { filenames_alphanumeric } from './checks/filenames'
import arrayFlat from 'core-js-pure/features/array/flat'

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
  const results = arrayFlat(await Promise.all(
    checks.map(check => check(files, options))
  ))

  // Filter non-errors (undefined)
  return results.filter(e => e !== undefined)
}

export default validate
