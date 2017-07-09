const gulp = require('gulp');
const isCI = require('is-ci');
const { tslintTask } = require('./tasks/tslint.js');
const prettierTask = require('./tasks/prettier.js');

gulp.task('tslint', () =>
  gulp.src(['./src/**/*.ts', '!./src/**/*.d.ts']).pipe(tslintTask())
);

gulp.task('prettier', () =>
  gulp
    .src(['./src/**/*.test.js', './tasks/*.js', './gulpfile.js'])
    .pipe(
      prettierTask(
        {
          trailingComma: 'es5',
          singleQuote: true,
        },
        {
          filter: true,
          validate: isCI,
        }
      )
    )
    .pipe(gulp.dest(file => file.base))
);

gulp.task('prettier-ts', () =>
  gulp
    .src(['./src/**/*.ts', '!./src/**/*.d.ts'])
    .pipe(
      prettierTask(
        {
          trailingComma: 'all',
          singleQuote: true,
          parser: 'typescript',
        },
        {
          filter: true,
          validate: isCI,
        }
      )
    )
    .pipe(gulp.dest(file => file.base))
);
