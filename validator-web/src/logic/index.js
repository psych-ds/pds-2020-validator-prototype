// Translate input from UI into the structure needed for validation
//
// The browser UI creates an array of files, each represented using
// the File class (https://developer.mozilla.org/en-US/docs/Web/API/File).
// The validation expects an object/dictionary with paths as keys,
// and file objects as values.

import { detectPrefix, stripPrefix } from './util/prefix'
import validateCore from 'validator-core'

const preprocess = (files) => {
  // Detect a common prefix from the set of files
  // (we also remove the leading slash from top-level files)
  const prefix = detectPrefix(files) + '/'

  // Create a hash of path/file pairs, removing the
  // prefix from every path. Top-level files should
  // now be available at 'filename.ext' (rather than
  // '/filename.ext' or '/only_dir/filename.ext')
  return Object.fromEntries(
    files.map(f => [stripPrefix(f.path, prefix), f])
  )
}

export default files => validateCore(preprocess(files))
