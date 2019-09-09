import Papa from 'papaparse'

import { makeCheck } from '../../util'
import { getAvailableMetadata } from '../../util/metadata'

const check_file = async ([path, file], { allFiles }) => {
  // Try to parse the beginning of the file
  // TODO: Use streaming if the file representation allows it
  const parseAttempt = Papa.parse(await file.text(), {
    preview: 100, // Only parse 100 lines for now
  })

  // TODO: Figure out if there is any scenario in which PPP
  // might throw an error, and wrap in try/catch if so.
  if (parseAttempt.errors.length > 0) {
    return {
      message: `Parse error: Couldn't parse data file`,
      file: path,
      severity: 'error',
      // TODO: Pass through details provided by papaparse
    }
  }

  // Check delimiter -----------------------------------------------------------
  if (parseAttempt.meta.delimiter !== '\t') {
    return {
      message: 'Not a tab-separated file',
      file: path,
      severity: 'error',
      details: [{
        message:
          `Column delimiter seems to be ‘${ parseAttempt.meta.delimiter }’`
      }],
    }
  }

  // Check column names --------------------------------------------------------
  const dataColumns = parseAttempt.data[0]
  const metadata = await getAvailableMetadata(path, allFiles)
  const metadataColumns = (metadata.variableMeasured || [])
    .map(v => v.name)
    .filter(name => typeof name == 'string')

  // Compute set differences
  const notInMetadata = dataColumns.filter(v => !metadataColumns.includes(v))
  const notInFile = metadataColumns.filter(v => !dataColumns.includes(v))

  // Prepare validation output
  if (notInMetadata.length > 0 || notInFile.length > 0) {
    const output = {
      message: 'Columns in file do not match metadata',
      file: path,
      severity: 'warning',
      details: [],
    }

    if (notInMetadata.length > 0) {
      output.details.push({
        message: `Missing from metadata: ${ notInMetadata.join(', ') }`
      })
    }

    if (notInFile.length > 0) {
      output.details.push({
        message: `Missing from file: ${ notInFile.join(', ') }`
      })
    }

    return output
  }
}

export const file_content = makeCheck(check_file, {
  glob: 'raw_data/**/*_data.tsv',
  mode: 'per_file',
})
