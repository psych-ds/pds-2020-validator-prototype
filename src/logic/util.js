export const getFile = (path, files, prefix='') =>
  files.filter(f => f.path === prefix + path)[0]
