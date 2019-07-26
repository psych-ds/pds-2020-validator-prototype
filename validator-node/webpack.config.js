const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'psychds-validator-node.js',
    path: path.resolve(__dirname, 'build')
  }
}
