const program = require('commander')
const fs = require('fs')
const pkg = require('../package.json')
const psychds = require('../src/index')

const validate = path => {
  // Check if path is accessible
  try {
    fs.lstatSync(path)
  } catch (error) {
    throw new Error(`Sorry, the path doesn't seem to exist`)
  }

  // Check whether path is a directory
  if (!fs.lstatSync(path).isDirectory()) {
    throw new Error(`It looks like the path isn't a directory`)
  }

  // Trigger validation
  psychds.default(path)
    .then(r => console.log('validation result', r))
}

program
  .version(pkg.version)
  .command('validate <path>')
  .description('Validate a folder according to the psych-ds standard')
  .action(validate)

program.parse(process.argv)

// Show help if no arguments are specified
if (program.args.length === 0) return program.help()
