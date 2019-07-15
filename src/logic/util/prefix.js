import {makeFileTree} from './tree'

// Detect the common path prefix given an array of files
// TODO: At present, this detects only a single level
export const detectPrefix = (files) => {
  const fileTree = makeFileTree(files.map(f => f.path))
  const topLevelFiles = Object.keys(fileTree)

  if (
    topLevelFiles.length === 1 &&
    fileTree[topLevelFiles[0]]['@type'] === 'directory'
  ) {
    return '/' + topLevelFiles[0]
  } else {
    return ''
  }
}

export const stripPrefix = (path, prefix) =>
  path.startsWith(prefix)
    ? path.slice(prefix.length)
    : path
