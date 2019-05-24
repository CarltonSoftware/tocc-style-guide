const fs = require('fs-extra');
const moment = require('moment');

module.exports = {
  getdir: (type, component) => { 
    return type + '/' + component;
  },
  getbranddir: (type, component, brand) => {
    return module.exports.getdir(type, component) + '/' + brand;
  },
  getcssfilepath: (type, component, brand) => {
    return module.exports.getbranddir(type, component, brand) + '/_' + component + '.scss';
  },
  fsCheckExists: (path) => {
    return fs.existsSync(path);
  },
  fsCheckAndCreateDirExists: (path) => { 
    if (!module.exports.fsCheckExists(path)) {
      fs.mkdirSync(path);
    }
  },
  getUtilLines: (path) => {
    var lines = [];

    // Include utility scss files
    lines.push('// Include Utilities');
    lines.push('@import \'' + path + '/index\';');
    
    return lines;
  },
  createScssFile: (basescsspath, author, responses, brand, brandname, additional) => {
    const cssFile = basescsspath + responses.type + '/' + brand + '/_' + responses.name + '.scss';
    fs.ensureFileSync(cssFile);
    var utillines = module.exports.getUtilLines(
      '../../utils'
    );

    fs.ensureFileSync(basescsspath + '/variables/_vanilla.scss');
    fs.ensureFileSync(basescsspath + '/variables/_' +  brand + '.scss');
    fs.ensureFileSync(basescsspath + '/fonts/_' +  brand + '.scss');
    
    // Write fonts file
    fs.writeFileSync(
      basescsspath + '/fonts/_' +  brand + '.scss', [
        '@import \'../variables/' + brand + '\';',
        '@import \'vanilla\';',
      ].join('\n')
    );

    utillines.push('');
    utillines.push('// Include global variables');
    if (brand !== 'vanilla') {
      utillines.push('@import \'../../variables/vanilla\';');
    }
    utillines.push('@import \'../../variables/' + brand + '\';');
    
    if (fs.existsSync(cssFile)) {
      fs.unlinkSync(cssFile);
    }
    
    fs.writeFileSync(
      cssFile, [
        '/**',
        ' * TOCC Style Guide Element',
        ' * ',
        ' * @filename ' + '_' + responses.name + '.scss',
        ' * @brand    ' + brandname,
        ' * @name     ' + responses.name,
        ' * @author   ' + author,
        ' * @date     ' + moment().format('YYYY-MM-DD'),
        ' */'
      ].concat(utillines).concat(additional).join('\n')
    );
  }
};