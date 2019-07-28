# Create a new environment for V8 to execute in
.env <- new.env(parent=emptyenv())

# Load library JS files from the package directory
.onLoad <- function(lib, pkg) {
  # Initialize V8
  .env$ctx <- V8::v8()
}
