import {makeFileTree} from './tree'

it('Generates a tree from a list of file paths', () => {
  const paths = [
    'foo/bar',
    'foo/baz/a',
    'foo/baz/b',
    'dfdf',
  ]

  const result = {
    foo: {
      '@type': 'directory',
      bar: {
        '@type': 'file',
      },
      baz: {
        '@type': 'directory',
        a: {
          '@type': 'file',
        },
        b: {
          '@type': 'file',
        },
      }
    },
    dfdf: {
      '@type': 'file',
    },
  }

  expect(makeFileTree(paths)).toEqual(result)
})
