import { detectPrefix } from './util'

it('detects common file prefixes (with leading slash)', () => {
  const files = [
    { path: '/foo/bar.xyz '},
    { path: '/foo/baz.xyz '},
  ]

  expect(detectPrefix(files)).toEqual('/foo')
})

it('detects common file prefixes (without leading slash)', () => {
  const files = [
    { path: 'foo/bar.xyz '},
    { path: 'foo/baz.xyz '},
  ]

  expect(detectPrefix(files)).toEqual('/foo')
})

it('detects if there are no common path prefixes', () => {
  const files = [
    { path: 'bar.xyz '},
    { path: 'foo/baz.xyz '},
  ]

  expect(detectPrefix(files)).toEqual('')
})
