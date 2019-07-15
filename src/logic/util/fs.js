export const getFile = (path, files, prefix='') =>
  files.filter(f => f.path === prefix + path)[0]

export const trimLeadingSlash = path =>
  path.startsWith('/')
    ? path.slice(1)
    : path
