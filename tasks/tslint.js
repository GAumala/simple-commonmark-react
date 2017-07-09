const { Linter, Configuration } = require('tslint');
const { Transform } = require('stream');
const { PluginError } = require('gulp-util');

const options = {
  fix: false,
  formatter: 'json',
};

const JSONtoReadableMessage = json => {
  const { ruleSeverity, ruleName, name, failure, startPosition } = json;
  const { character, line } = startPosition;
  return (
    `${ruleSeverity}: (${ruleName}) https://palantir.github.io/tslint/rules/${ruleName}` +
    `\n\t${name}[${line + 1}, ${character + 1}]: ${failure}\n`
  );
};

const formatOutput = output => {
  const messages = JSON.parse(output);
  return messages
    .map(JSONtoReadableMessage)
    .reduce((output, message) => output + message, '');
};

class TSLintTransform extends Transform {
  constructor() {
    super({ objectMode: true });
    this.linterOutput = '';
  }

  initLinter(filepath) {
    if (!this.linter) {
      this.configuration = Configuration.findConfiguration(
        null,
        filepath
      ).results;
      this.linter = new Linter(options);
    }
  }

  lintFile(inputFile) {
    const { relative, path, _contents } = inputFile;
    const tsCode = _contents.toString();
    if (!this.linter) this.initLinter(path);
    this.linter.lint(relative, tsCode, this.configuration);
  }

  _transform(inputFile, encoding, callback) {
    this.lintFile(inputFile);
    callback(null, inputFile);
  }

  getLinterOutput() {
    const output = this.linter.getResult().output;
    const errorMessage = formatOutput(output);
    if (errorMessage !== '')
      return new PluginError(
        'gulp-tslint',
        'tslint reported the following problems: \n\n' + errorMessage
      );
  }

  _flush(callback) {
    callback(this.getLinterOutput());
  }
}

const tslintTask = () => new TSLintTransform();

module.exports = { tslintTask };
