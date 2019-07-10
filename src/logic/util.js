export const getFile = (path, files, prefix='') =>
  files.filter(f => f.path === prefix + path)[0]

const trimLeadingSlash = path =>
  path.startsWith('/')
    ? path.slice(1)
    : path

// A very naive tree implementation
// (dear kind CS folks, please have mercy on me,
// I know I should have paid better attention in class)
const addBranch = (path, tree={}, {leaf={}, defaultNode={}}={}) => {
  const [currentNode, ...remainder] = path

  tree[currentNode] = remainder.length === 0
    ? leaf
    : addBranch(
        remainder,
        tree[currentNode] || defaultNode,
        {leaf, defaultNode}
      )

  return tree
}

const makeFileTree = (paths) => {
  let tree = {}

  paths.forEach(p => {
    // Split path into directories and filename
    const path = trimLeadingSlash(p).split('/')
    tree = addBranch(path, tree, {
      leaf: {'@type': 'file'},
      defaultNode: {'@type': 'directory'},
    })
  })

  return tree
}

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
