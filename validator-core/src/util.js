import { pickBy } from 'lodash'
import minimatch from 'minimatch'

export const pickFiles = (files, glob) =>
  pickBy(files, (_, path) => minimatch(path, glob))

// Wrapper function to simplify file handling in the check functions
export const makeCheck = (fn, { glob='**/*.*', mode='global' }) =>
  async (files, opt, ...args) => {
    // Filter files according to the glob pattern
    const filteredFiles = pickFiles(files, glob)
    const options = {
      ...opt,
      allFiles: files,
    }

    // Apply filter to all files individually, or pass through all files
    if (mode === 'per_file') {
      return await Promise.all(
        Object.entries(filteredFiles).map(f => fn(f, options, ...args))
      )
    } else {
      return await fn(filteredFiles, options, ...args)
    }
  }
