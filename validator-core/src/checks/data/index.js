import Papa from 'papaparse'
import flat from 'core-js-pure/features/array/flat'

import { pickFiles } from '../../util'

const check_file = async ([path, file]) => {
  // Try to parse the beginning of the file
  const parseAttempt = Papa.parse(await file.text(), {
    preview: 100,
    dynamicTyping: true
  })

  // TODO: Decide if there is any scenario in which PPP
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
      }]
    }
  }
}

export const file_content = async (files) => {
  const data_files = pickFiles(files, 'raw_data/**/*_data.tsv')
  // Hand-filtering here because of premature optimization:
  // We might want to do some additional work per-file, which
  // we would not want to repeat. Then again, maybe that would
  // be possibly by passing all files through the check wrapper.
  // It's going to be worth revisiting the design here once
  // the basic functionality is in place!

  return flat(
    await Promise.all(Object.entries(data_files).map(check_file))
  )
}
