// Split a file path into three parts:
// - The directory path, e.g. raw_data/foo/bar/
// - The file prefix, e.g. experiment_1 (for experiment_1_data.tsv)
// - The file appendix _data.tsv
const datafileRegex = /((?:[^\/]+\/)+)(.+)(_data.tsv)/gi

const getSidecarPath = (path) =>
  path.match(datafileRegex)
    ? path.replace(datafileRegex, '$1$2_data.json')
    : undefined

const tryParsingJSON = async (file) => {
  try {
    return JSON.parse(await file.text())
  } catch (error) {
    return {}
  }
}

export const getAvailableMetadata = async (path, files) => {
  // Load top-level metadata
  const globalMetadata = await tryParsingJSON(files['dataset_description.json'])

  // Load file-specific metadata
  const sidecarPath = getSidecarPath(path)
  const localMetadata = await tryParsingJSON(files[sidecarPath])

  // Merge both metadata sources
  return {
    ...globalMetadata,
    ...localMetadata,
  }
}
