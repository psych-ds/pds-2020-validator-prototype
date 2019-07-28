const decode = (base64) => {
  // The V8 package pushes data into the JS environment
  // as a base64 string, which we need to decode back
  // into raw data
  const binary =  atob(base64)
  const bytes = new Uint8Array(binary.length)

  // Fill buffer, decoding raw bytes
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }

  return bytes.buffer
}

class File {
  constructor(path) {
    this.path = path
  }

  async text() {
    // TODO: Files should be decoded as UTF-8
    // (at present, readr will use the users's default_locale)
    return console.r.call('readr::read_file', {file: this.path})
  }

  async arrayBuffer() {
    const data = console.r.call('readr::read_file_raw', {file: this.path})[0]
    return decode(data)
  }
}
