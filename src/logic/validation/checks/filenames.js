import { stripPrefix } from '../../util/prefix'

export const filenames_alphanumeric = (files, { prefix }) =>
  // Check whether the file names are alphanumeric.
  // If the file path matches, everything is ok (return undefined),
  // otherwise return an error including further data
  files.map(
    f => /^[a-zA-Z0-9_\-/.]+$/g.test(f.path)
      ? undefined
      : {
          message: 'Non-alphanumeric file path',
          file: stripPrefix(f.path, prefix),
          severity: 'error',
        }
  )
