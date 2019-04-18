const connect = require('tabsutils/utils/connect');
const clientUtils = require('tabsutils/utils/clientUtils');
const prompt = require('tabsutils/utils/prompt');
const whoAmi = require('tabsutils/utils/whoAmi');
const fs = require('fs-extra');
const moment = require('moment');
const utils = require('./utils');

const basescsspath = __dirname + '/../../scss/';
const basejspath = __dirname + '/../';

const createCssFile = (me, responses, brand, brandname, additional) => {
  const cssFile = basescsspath + responses.type + '/' + brand + '/_' + responses.name + '.scss';
  fs.ensureFileSync(cssFile);
  var utillines = utils.getUtilLines(
    '../../utils'
  );
  fs.writeFileSync(
    cssFile, [
      '/**',
      ' * TOCC Style Guide Element',
      ' * ',
      ' * @filename ' + '_' + responses.name + '.scss',
      ' * @brand    ' + brandname,
      ' * @name     ' + responses.name,
      ' * @author   ' + me.getFullName(),
      ' * @date     ' + moment().format('YYYY-MM-DD'),
      ' */'
    ].concat(utillines).concat(additional).join('\n')
  );
};

(async function() {
  const instance = await connect();

  const responses = await prompt.getResponses([{
    type: 'select',
    name: 'type',
    message: 'What type of element do want to create?',
    choices: [
      { title: 'Base', value: 'base' },
      { title: 'Component', value: 'component' },
      { title: 'Trump', value: 'trump' }
    ]
  }, {
    type: 'text',
    name: 'name',
    message: 'Enter the element name you want to create.',
    validate: (value) => {
      if ((/^[a-z]+$/.test(value))) {
        return true;
      } else {
        return 'Only lower case letters with no additional formatting is allowed.';
      }
    }
  }, {
    type: 'text',
    name: 'description',
    message: 'Describe your element:'
  }]);

  const me = await whoAmi(instance);

  // Get elements file and add new element into it.
  var elementsSrc = __dirname + '/../elements.json';
  var elementsSrcJson = JSON.parse(fs.readFileSync(
      elementsSrc
  ).toString());

  if (!elementsSrcJson[responses.type]) {
    elementsSrcJson[responses.type] = [];
  }

  elementsSrcJson[responses.type].push({
    name: responses.name,
    description: responses.description,
    createdby: me.getFullName()
  });

  fs.writeFileSync(elementsSrc, JSON.stringify(elementsSrcJson));

  // Create vanilla type
  createCssFile(me, responses, 'vanilla', 'Vanilla', []);

  // Get marketing brands from client
  const marketingbrands = await clientUtils.getCollection(instance, 'MarketingBrand');

  // Create marketing brand folders
  marketingbrands.forEach((mb, i) => {
    // Create brand variants
    createCssFile(
      me,
      responses,
      mb.id,
      mb.name,
      [
        '',
        '',
        '@import \'../vanilla/' + responses.name + '\';'
      ]
    );
  });
})();