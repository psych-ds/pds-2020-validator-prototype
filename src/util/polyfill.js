// Polyfill for Blob.text(), adapted from
// https://developer.mozilla.org/en-US/docs/Web/API/Blob/text#Polyfill
Object.defineProperty(Blob.prototype, 'text', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function text() {
    return new Response(this).text()
  },
})

// Polyfill for Blob.arrayBuffer(), adapted from
// https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer#Polyfill
Object.defineProperty(Blob.prototype, 'arrayBuffer', {
  configurable: true,
  enumerable: true,
  writable: true,
  value: function arrayBuffer() {
    return new Response(this).arrayBuffer()
  },
})
