const connect = require('tabsutils/utils/connect');
const clientUtils = require('tabsutils/utils/clientUtils');
const prompt = require('tabsutils/utils/prompt');
const whoAmi = require('tabsutils/utils/whoAmi');
const fs = require('fs-extra');
const utils = require('./utils');
const packageJson = require('../../package.json');
const basescsspath = __dirname + '/../scss/';
const basecsspath = __dirname + '/../../public/css/' + packageJson.version + '/';
const getdir = utils.getdir;
const getbranddir = utils.getbranddir;
const getfilepath = utils.getfilepath;
const fsCheckExists = utils.fsCheckExists;
const fsCheckAndCreateDirExists = utils.fsCheckAndCreateDirExists;
const sass = require('node-sass');

// Create each css for the brands
(async function() {
  const instance = await connect();

  // Loop through each brand and create the main.scss file
  var elementsSrc = __dirname + '/../elements.json';
  var types = JSON.parse(fs.readFileSync(
      elementsSrc
  ).toString());

  // Remove css directory and recreate
  fs.emptyDirSync(basecsspath);

  // Loop through all of the brands to create a new file
  const marketingbrands = await clientUtils.getCollection(instance, 'MarketingBrand');
  marketingbrands.push({ id: 'vanilla' })
  marketingbrands.forEach((mb) => {
    const baseCssPath = basecsspath + mb.id;
    const scssPath = basescsspath + mb.id + '.scss';

    // Start creating the main css file
    var lines = [
      '',
      ''
    ];

    var utillines = utils.getUtilLines(
      'utils'
    );
    lines = lines.concat(utillines);
    lines.push('');
    lines.push('');
    
    // Create font file for the marketing brand
    const fontPath = basecsspath + '../../fonts/' +  packageJson.version + '/' + mb.id + '.css';
    fs.ensureFileSync(fontPath);

    if (fsCheckExists(fontPath)) {
      fs.unlinkSync(fontPath);
    }

    fs.writeFileSync(
      fontPath,
      sass.renderSync({
        file: basescsspath + 'fonts/_' + mb.id + '.scss',
        sourceMap: true,
        outputStyle: 'expanded'
      }).css.toString().replace(/\/\*[^*]*\*+([^\/][^*]*\*+)*\//, '').replace(/\/fonts\//g, '../fonts/')
    );

    // Loop through all of the different types of elements
    for (const t in types) {
      lines.push('// Include ' + t.charAt(0).toUpperCase() + t.slice(1) + 's');

      // Loop through all of the different elements in said type
      for (const c in types[t]) {
        
        const path = baseCssPath + '/' + t + '/' + types[t][c].name + '/' + types[t][c].name + '.css';
        
        // Create directory
        fs.ensureFileSync(path);

        // Create the element css file with the utilities plus the
        // included element file from the marketing brand directory
        fs.writeFileSync(
          path,
          sass.renderSync({
            data: utils.getUtilLines(basescsspath + 'utils').concat(
              [
                '@import \'' + basescsspath + t + '/' + mb.id + '/' + types[t][c].name + '\';'
              ]
            ).join('\n'),
            outputStyle: 'expanded'
          }).css.toString().replace(/\/\*[^*]*\*+([^\/][^*]*\*+)*\//, '')
        );

        // Add element import to main css file
        lines.push('@import \'' + t + '/' + mb.id + '/' + types[t][c].name + '\';');
      }

      // Bit of padding to make it look nicer
      lines.push('');
      lines.push('');
    }

    // Remove index.scss file
    if (fsCheckExists(scssPath)) {
      fs.unlinkSync(scssPath);
    }

    // Create new index.scss file with components
    fs.writeFileSync(
      scssPath,
      lines.join('\n')
    );

    // Build new file
    const result = sass.renderSync({
      file: scssPath,
      sourceMap: true,
      outputStyle: 'expanded'
    });

    // Remove index css file
    if (fsCheckExists(baseCssPath + '/index.css')) {
      fs.unlinkSync(baseCssPath + '/index.css');
    }

    fs.writeFileSync(
      baseCssPath + '/index.css',
      result.css.toString().replace(/\/\*[^*]*\*+([^\/][^*]*\*+)*\//, '')
    );

    // Remove map file
    if (fsCheckExists(baseCssPath + '/index.css.map')) {
      fs.unlinkSync(baseCssPath + '/index.css.map');
    }

    if (result.map) {
      fs.writeFileSync(
        baseCssPath + '/index.css.map',
        JSON.stringify(result.map)
      );
    }
  });

})();