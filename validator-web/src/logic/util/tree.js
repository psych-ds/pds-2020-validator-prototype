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

export const makeFileTree = (paths) => {
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
