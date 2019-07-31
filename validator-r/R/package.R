.prepareCtx <- function(ctx) {
  # Load JS modules
  rootDir <- system.file(package=.packageName)
  scripts <- c('atob.js', 'file.js', 'psychds-validator.js')

  for (script in scripts) {
    result <- ctx$source(
      file.path(rootDir, script)
    )

    # TODO: Leaving out error handling for now because it doesn't work consistently
    # (need to figure out what the result actually indicates -- the scripts will
    # load fine even if the result isn't 'true' or if is 'undefined')
    #if (result == 'undefined') {
    #  stop(paste('Couldn\'t load validator JS library from', script))
    #}
  }

  return(ctx)
}

.generatePathPairs <- function (directory) {
  # Account for working directory, unix shortcuts, etc.
  path <- normalizePath(directory)

  # Find files recursively
  files <- dir(path, recursive=T)

  # Create pairs of relative and absolute path
  pairs <- purrr::map(files, function(f) c(f, file.path(path, f)))

  return(pairs)
}

# Validate the contents of a directory according to the PsychDS standard
.validate <- function(directory) {
  # Setup V8 context
  ctx <- .prepareCtx(.env$ctx)

  # Generate pairs of directory-relative and absolute paths
  # for all files in the directory
  pathPairs <- .generatePathPairs(directory)

  # Transfer path pairs into V8 (where they are translated into a nested array)
  ctx$assign('paths', pathPairs)

  # Create a mapping from local path to file objects
  ctx$eval('const input = paths
    .reduce((acc, [p, f]) => { acc[p] = new File(f); return acc }, {})')

  ctx$eval('
    let result
    let error = ""
    psychds.default(input)
      .then((r) => { result = r })
      .catch((e) => { error = e.message })
  ')
  # TODO: It's not entirely clear whether the promise will resolve
  # in time for the transfer back into R to happen, especially for
  # larger datasets. I haven't seen a race condition so far, but
  # we might run into one later, in which case there are several
  # options, for example:
  # - We can just wait for a fixed amount of time
  #   (because the validator most likely won't run in a tight loop,
  #   we don't need maximum performance)
  # - We can track the state of the result variable, and check
  #   its value periodically before moving on

  # Transfer results back into R
  result <- ctx$get('result')
  error <- ctx$get('error')

  # Close V8 context
  ctx$reset()

  if (error != '') {
    stop('Encountered error during validation: ', error)
  }

  return(result)
}

validate <- function(directory) {
  # Gather validation results
  results <- .validate(directory)

  # Generate output
  .output(results)

  # Return results in an accessible, but invisible, form
  invisible(results)
}
