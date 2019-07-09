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
  filenames_ascii,
]

const validate = (files) =>
  // Run all of the checks for all of the files,
  // then filter non-errors (undefined)
  checks
    .flatMap(check => check(files))
    .filter(e => e !== undefined)

export default validate
