import validate from 'validator-core'
import { scanDirectory } from './util/file'

// Validate a directory from the filesystem
const validateDirectory = async (dir) => {
  const scan = await scanDirectory(dir)
  const result = await validate(scan)
  return result
}

export default validateDirectory
