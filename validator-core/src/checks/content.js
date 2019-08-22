import { detect as detectEncoding } from 'jschardet'
import Papa from 'papaparse'

const fileToRawString = async (file) => {
  // JS encodes files as UTF-8 automagically, making
  // character set detection very hard. Herein, we
  // circumvent the automatic file loading to create
  // a raw string from the file contents.

  // Load the raw data into an array
  const buffer = await file.arrayBuffer()
  const data = new Uint8Array(buffer)

  // Convert data array to string
  let string = ''
  for (let i = 0; i < data.length; i++) {
    string += String.fromCharCode(data[i])
  }
  return string
}

export const file_content = (files) => {
  console.log(files)
  Promise.all(Object.entries(files).map(
    async ([path, file]) => {

        if (path.startsWith('raw_data') & path.endsWith('.tsv')) {
            console.log(
                Papa.parse(await file.text(), {
                    preview: 2,
                    dynamicTyping: true
                })
            )
        }
    }
  ))
}
