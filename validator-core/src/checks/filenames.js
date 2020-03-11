import { makeCheck } from '../util'

// Note: When more browsers support then, we might
// investigate Unicode property escapes, e.g. /[\p{ASCII}]/ug; see
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
const permittedPath = /^[a-zA-Z0-9_\-/.]+$/g
const permittedChars = /[a-zA-Z0-9_\-/.]/g

const codePoint = character => {
  const hex = character.codePointAt(0).toString(16)
  return '00000'.substring(hex.length) + hex
}

const file_name_alphanumeric = ([path, _]) =>
  // Check whether the file names are alphanumeric.
  // If the file path matches, everything is ok (return undefined),
  // otherwise return an error including further data
  permittedPath.test(path)
    ? undefined
    : {
        message: 'Non-alphanumeric file path',
        file: path,
        severity: 'error',
        details: Array.from(path.normalize().replace(permittedChars, ''))
          .map(c => ({
            character: c,
            codePoint: codePoint(c),
            message: `Invalid character: ${ c }`,
            messageAddon: `(https://decodeunicode.org/en/u+${ codePoint(c) })`,
          }))
      }

export const filenames_alphanumeric = makeCheck(file_name_alphanumeric, {
  glob: '**/*.*',
  mode: 'per_file'
})
