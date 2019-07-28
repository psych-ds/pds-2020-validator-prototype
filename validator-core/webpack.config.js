const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'psychds-validator.js',
    path: path.resolve(__dirname, 'build'),
    library: 'psychds',
    libraryTarget: 'assign',
    globalObject: 'global',
  },
  // Increase output file size limits
  // (since we don't deploy directly to the
  // browser, we aren't as concerned for now)
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}
