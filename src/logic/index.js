// Translate input from UI into the structure needed for validation
//
// The browser UI creates an array of files, each represented using
// the File class (https://developer.mozilla.org/en-US/docs/Web/API/File).
// The validation expects an object/dictionary with paths as keys,
// and file objects as values.

import { detectPrefix, stripPrefix } from './util/prefix'
import validateCore from './validation'

const preprocess = (files) => {
  const prefix = detectPrefix(files)
  return Object.fromEntries(
    files.map(f => [stripPrefix(f.path, prefix), f])
  )
}

export default files => validateCore(preprocess(files))
