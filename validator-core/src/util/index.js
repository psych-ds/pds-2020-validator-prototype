import { pickBy } from 'lodash'
import minimatch from 'minimatch'
import flat from 'core-js-pure/features/array/flat'

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
    // TODO: Handle errors in tests
  }

export const aggregateChecks = async (checks, files, options={}) => {
  // Run all of the checks for all of the files
  // (this happens asyncronously)
  const results = await Promise.all(
    checks.map(check => check(files, options))
  )

  // Flatten and filter non-errors (undefined)
  return flat(results).filter(e => e !== undefined)
}
