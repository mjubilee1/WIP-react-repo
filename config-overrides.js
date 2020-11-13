const { override, fixBabelImports, addDecoratorsLegacy, disableEsLint } = require('customize-cra');

module.exports = override(
  fixBabelImports(
    'import',
    {
      libraryName: 'babel-plugin-styled-components',
    },
    {
      libraryName: 'react-app-rewire-mobx',
    }
  ),
  disableEsLint(),
  addDecoratorsLegacy()
);
