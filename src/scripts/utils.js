const fs = require('fs-extra');

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
  }
};