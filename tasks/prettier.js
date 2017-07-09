const Buffer = require('buffer').Buffer;
const prettier = require('prettier');
const PluginError = require('gulp-util').PluginError;
const { Transform } = require('stream');

const getPrettierSourceCode = (sourceCode, options) => {
  if (prettier.check(sourceCode, options)) return null;
  else return prettier.format(sourceCode, options);
};

class PrettierTransform extends Transform {
  constructor(prettierOptions, pluginOptions) {
    super({ objectMode: true });
    this.prettierOptions = prettierOptions;
    this.pluginOptions = pluginOptions;
    this.uglyFiles = '';
  }

  appendUglyFiles(path) {
    this.uglyFiles += '- ' + path + '\n';
  }

  createOutputFile(transformedCode, inputFile) {
    const outputFile = inputFile.clone();
    const filter = this.pluginOptions.filter;
    if (transformedCode === null && filter) return null;
    else if (transformedCode === null) return inputFile;
    else {
      this.appendUglyFiles(inputFile.path);
      outputFile._contents = Buffer.from(transformedCode);
      return outputFile;
    }
  }

  _transform(inputFile, encoding, callback) {
    if (inputFile.isBuffer()) {
      const { _contents } = inputFile;
      const code = _contents.toString();
      const prettierOptions = this.prettierOptions;
      const prettierSourceCode = getPrettierSourceCode(code, prettierOptions);
      const outputFile = this.createOutputFile(prettierSourceCode, inputFile);
      return callback(null, outputFile);
    } else {
      const err = new PluginError(
        'gulp-prettier-plugin',
        'this plugin only suppports buffers.'
      );
      return callback(err, inputFile);
    }
  }

  _flush(callback) {
    const { uglyFiles, pluginOptions } = this;
    const { validate } = pluginOptions;
    let err;
    if (validate && uglyFiles.length > 0) {
      err = new PluginError(
        'gulp-prettier-plugin',
        'The following files have not been styled with prettier:\n\n' +
          this.uglyFiles
      );
    }
    callback(err);
  }
}

const prettierTask = (prettierOptions, pluginOptions) =>
  new PrettierTransform(prettierOptions, pluginOptions);

module.exports = prettierTask;
