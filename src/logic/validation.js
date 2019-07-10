import { getFile, detectPrefix } from './util'

const description_present = (files, { prefix }) =>
  // A top-level file is called dataset_description.json
  getFile('/dataset_description.json', files, prefix) !== undefined
    ? undefined
    : {
        message: 'No dataset description found',
        file: '/dataset_description.json',
        severity: 'error',
      }

const filenames_ascii = files =>
  // Check whether the file names are alphanumeric.
  // If the file path matches, everything is ok (return undefined),
  // otherwise return an error including further data
  files.map(
    f => /^[a-zA-Z0-9_\-/.]+$/g.test(f.path)
      ? undefined
      : {
          message: 'Non-alphanumeric file path',
          file: f.path,
          severity: 'error',
        }
  )

const checks = [
  description_present,
  filenames_ascii,
]

const validate = (files) => {
  // Supply some metadata around the files
  const options = {
    prefix: detectPrefix(files)
  }

  // Run all of the checks for all of the files,
  // then filter non-errors (undefined)
  return checks
    .flatMap(check => check(files, options))
    .filter(e => e !== undefined)
}

export default validate
