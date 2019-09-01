import { makeCheck } from '../util'

const file_name_alphanumeric = ([path, _]) =>
  // Check whether the file names are alphanumeric.
  // If the file path matches, everything is ok (return undefined),
  // otherwise return an error including further data
  /^[a-zA-Z0-9_\-/.]+$/g.test(path)
    ? undefined
    : {
        message: 'Non-alphanumeric file path',
        file: path,
        severity: 'error',
      }

export const filenames_alphanumeric = makeCheck(file_name_alphanumeric, {
  glob: '**/*.*',
  mode: 'per_file'
})
