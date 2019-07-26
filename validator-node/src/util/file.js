import fs from 'fs'
import path from 'path'

import plainGlob from 'glob'
import { fromPairs } from 'lodash'

// Wrap functions to make them compatible with async
import { promisify } from 'util'
const readFile = promisify(fs.readFile)
const glob = promisify(plainGlob)

// Minimal wrapper to match the in-browser File implementation
// (please note that this is by no means complete, it's just
// enough to cover the methods that the validator actually uses.
// also, it's initialized with the path and a working directory,
// while the in-browser File is initialized from a buffer)
class File {
  constructor(path, wd) {
    this.relPath = path
    this.wd = wd
  }

  get path() {
    return path.join(this.wd, this.relPath)
  }

  async text() {
    // Read and decode the file
    // (returns a promise)
    return readFile(this.path, 'utf-8')
  }

  async arrayBuffer() {
    // Read the file and return its raw contents
    // (returns a promise)
    return readFile(this.path)
  }
}


// Scan a directory, returning an object that has the local path
// as the key, and a File object (see above) as the value
export const scanDirectory = async (dir) => {
  const result = await glob('**/*', { cwd: dir })
  const files = result.map(path => [path, new File(path, dir)])
  return fromPairs(files)
}
