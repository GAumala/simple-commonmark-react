const Buffer = require('buffer').Buffer;
const gulp = require('gulp');
const concat = require('gulp-concat');
const { Linter, Configuration } = require('tslint');
const { Transform } = require('stream');

const options = {
  fix: false,
  formatter: 'verbose',
};
let configuration;

const getLinter = filepath => {
  if (!configuration)
    configuration = Configuration.findConfiguration(null, filepath).results;
  return new Linter(options);
};

const createLintOutputFile = (linterOutput, inputFile) => {
  let outputContents = null;
  if (linterOutput.trim() !== '') outputContents = Buffer.from(linterOutput);
  const outputFile = inputFile.clone();
  outputFile._contents = outputContents;
  return outputFile;
};

const lintFile = inputFile => {
  const { relative, path, _contents } = inputFile;
  const tsCode = _contents.toString();
  const linter = getLinter(path);
  linter.lint(relative, tsCode, configuration);
  const { output } = linter.getResult();
  return createLintOutputFile(output, inputFile);
};

const tslintTask = () =>
  new Transform({
    objectMode: true,
    transform: (inputFile, encoding, callback) => {
      const outputFile = lintFile(inputFile);
      callback(null, outputFile);
    },
  });

const displayErrorsTask = done =>
  new Transform({
    objectMode: true,
    transform: (inputFile, encoding, callback) => {
      if (inputFile.isNull()) {
        return callback(null, inputFile);
      } else
        done(
          'Linter reported the following error(s)\n' +
            inputFile._contents.toString()
        );
    },
  });

gulp.task('tslint', done =>
  gulp
    .src(['./src/**/*.ts', '!./src/**/*.d.ts'])
    .pipe(tslintTask())
    .pipe(concat('lint_errors.txt'))
    .pipe(displayErrorsTask(done))
);
