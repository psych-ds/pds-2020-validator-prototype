import { aggregateChecks } from './util'

import {
  description_present,
  description_matches_specification
} from './checks/description'
import { encoding_utf8 } from './checks/encoding'
import { file_content } from './checks/data'
import { filenames_alphanumeric } from './checks/filenames'

const checks = [
  description_present,
  description_matches_specification,
  encoding_utf8,
  filenames_alphanumeric,
  file_content
]

const validate = async (files, options) =>
  await aggregateChecks(checks, files, options)

export default validate
