import Papa from 'papaparse'

import { makeCheck } from '../../util'

const check_file = async ([path, file]) => {
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

  // Check delimiter
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
}

export const file_content = makeCheck(check_file, {
  glob: 'raw_data/**/*_data.tsv',
  mode: 'per_file',
})
