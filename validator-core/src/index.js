import {
  description_present,
  description_matches_specification
} from './checks/description'
import { encoding_utf8 } from './checks/encoding'
import { filenames_alphanumeric } from './checks/filenames'

const checks = [
  description_present,
  description_matches_specification,
  encoding_utf8,
  filenames_alphanumeric,
]

const validate = async (files, options={}) => {
  // Run all of the checks for all of the files
  // (this happens asyncronously)
  const results = (await Promise.all(
    checks.map(check => check(files, options))
  )).flat()

  // Filter non-errors (undefined)
  return results.filter(e => e !== undefined)
}

export default validate
