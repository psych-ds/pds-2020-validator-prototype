.cat <- function(..., margin=2) {
  # Add consistent margin to multiple lines
  do.call(cat,
    c(
      # I'm not sure whether I should laugh or cry
      # after having figured out how this works
      '...'=purrr::map(c(...), function(line) {
        # Indent lines
        return(strwrap(line, indent = margin, exdent = margin))
      }),
      # Separate by newline
      sep='\n'
    )
  )
}

# Custom styles
warn <- crayon::make_style(rgb(0.5, 0.1, 0.0)) # Yellow doesn't come out well

.renderVerdict <- function(issues) {
  # Overall validation result
  if (length(issues) == 0) {
    .cat(
      crayon::green(
        crayon::bold('Looks great!'),
        cli::symbol$tick,
        'We couldn\'t find any problems'
      ),
      crayon::white(
        'No issues found in Psych-DS dataset',
        cli::symbol$em_dash,
        praise::praise('${Exclamation}! This dataset is ${adjective}!')
      )
    )
  } else {
    .cat(
      crayon::red(
        crayon::bold('Not quite there yet!'),
        cli::symbol$cross
      ) %+% ' ' %+%
      warn('There\'s a few things that we\'ll need you to fix.'),
      crayon::white(
        nrow(issues), ifelse(nrow(issues) == 1, 'issue', 'issues'), 'found in Psych-DS dataset'
      )
    )
  }
}

.renderIssues <- function(issues) {
  if (length(issues) > 0) {
    cat(cli::rule(left = 'Issues'), '\n\n')

    issues %>%
      dplyr::group_by(file) %>%
      dplyr::group_map(function(file_issues, file) {
        # File header
        .cat(crayon::bold(file))

        # Surely there must be a better way of doing this?
        for (i in 1:nrow(file_issues)) {
          row <- file_issues[i,]
          .cat(
            cli::style_dim(cli::symbol$bullet %+% ' ' %+% row$message),
            margin=4
          )
        }

        # Add a newline after every file
        cat('\n')
      })
  }
}

.output <- function(issues) {
  # TODO: It would make the code much easier if we could define
  # a couple of generic styles in crayon, such as ok(), warn() and note().
  # (see https://github.com/r-lib/crayon#usage). However I don't
  # know whether it is possible to use the fancier features from
  # crayon in a package (string concatenation and style combination).

  cat('\n')
  .renderVerdict(issues)
  cat('\n')
  .renderIssues(issues)
}
