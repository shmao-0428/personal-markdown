const path = require('path');
const { promisify } = require('util');
const fs = require('fs');
const { validate } = require('schema-utils');
const schema = require('./readFileListSchema.json');
const writeFile = promisify(fs.writeFile)

class ReadFileList {
    constructor(options) {
        validate(schema, options, {
            name: 'ReadFileList'
        })
        this.options = options
    }

    apply (comipler) {
        comipler.hooks.afterEmit.tap('ExportAssets', (compilation) => {
            // debugger
            // console.log(compilation.assets);
            const files = Object.keys(compilation.assets);
            const data = JSON.stringify(files);
            const _path = path.resolve(comipler.options.output.path, this.options.output)
            writeFile(_path, data)
        })
    }
}

module.exports = ReadFileList