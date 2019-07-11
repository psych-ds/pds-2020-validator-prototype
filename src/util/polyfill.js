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
