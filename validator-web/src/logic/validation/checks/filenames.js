export const filenames_alphanumeric = (files) =>
  // Check whether the file names are alphanumeric.
  // If the file path matches, everything is ok (return undefined),
  // otherwise return an error including further data
  Object.keys(files).map(
    path => /^[a-zA-Z0-9_\-/.]+$/g.test(path)
      ? undefined
      : {
          message: 'Non-alphanumeric file path',
          file: path,
          severity: 'error',
        }
  )
