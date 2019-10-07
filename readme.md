# Psych-DS validator 📦➞💚

[![Netlify Status](https://api.netlify.com/api/v1/badges/333a46b0-9000-42be-ba73-ae097114b08a/deploy-status)](https://app.netlify.com/sites/psychds-validator/deploys)

**This validator checks whether a data repository is documented according to the [`psych-ds` metadata standard](https://psych-ds.github.io/).** It's built to work as a website, a command-line application, or an `R` package.

## Using the validator

#### Online 🌍

**Running the validator from your browser is the easiest way to get started.** Please head over to our [**online validator**](https://psychds-validator.netlify.com/) and drag your data folder onto the blue zone.

#### In `R` 🖥

##### Installation

The `R` package is presently under development and therefore not currently listed on [`CRAN`](https://cran.r-project.org/). In the meantime, you can install the latest version of the package from the R command line with the commands:
```
install.packages(devtools)  # Can be omitted if devtools is already installed
devtools::install_url(url = "https://github.com/psych-ds/validator-prototype/files/3638496/psychds_0.1.0.tar.gz")
```

##### Usage

After installing the `psychds` package, you can then validate a data folder:

```
psychds::validate('data_folder_path')
```

For example, you might want to validate your project directory with the following command:

```
psychds::validate('.')
```

----

## Development 🚀

### Repository overview

The project consists of several different parts that work together.

* The `validator-core` directory contains the main validation logic that is used throughout the project.
* You'll find the web validator interface in the `validator-web` folder
* The `validator-r` directory holds the project [`R`](https://r-project.org/) package
* The `validator-node` folder is for the node-based command-line interface

### Build instructions

To build the project, you'll need a local installation of the [`node` JavaScript runtime](https://nodejs.org/) and the [`yarn` package manager](https://yarnpkg.com). With both of these in place, please run the `yarn` command in the project directory to download and install all dependencies (there will be a few warnings about unmet peer dependencies, you can safely ignore these).

#### Validator core

After setting up the project, the next step is to build the JavaScript validator core by running **`yarn build:core`**.

#### Web interface

If you would like to build the web interface, you can run the command **`yarn build:web`**, which will collect all files necessary to host the web interface in the `validator-web/build` directory. You can upload these to a web server of your choice, from which you will then be able to access the validator interface.

For development, it can be convenient to start a local server with the interface running on it. The command `(cd validator-web && yarn start)` will accomplish this.

#### `R` package

To build the `R` package, you will need an [`R` installation](https://r-project.org/) as well as the [`devtools` package](https://github.com/r-lib/devtools). You can then build and develop the package in either of the following ways:

* For package development, we recommend using [`RStudio`](https://www.rstudio.com/) and its built-in package management tools. To do so, please first run `yarn build:core` and `yarn setup:r` in the repository root directory to build and copy the validator core into the `R` package folder. You can then open the `psychds.Rproj` project file from the `validator-r` directory in `RStudio`, and use its [package development features](https://support.rstudio.com/hc/en-us/sections/200130627-Package-Development).
* Alternatively, you can run `yarn build:core` and any the following commands from the root directory to check, build and install the package directly:
  * `yarn check:r`
  * `yarn build:r`
  * `yarn install:r`
