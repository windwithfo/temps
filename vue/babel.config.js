module.exports = {
  presets: [
    ['@babel/env', {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: 2
    }]
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {
      legacy: true
    }],
    ['@babel/plugin-proposal-class-properties', { "loose": true }],
    ['component', {
      libraryName: 'element-ui',
      styleLibraryName: 'theme-chalk'
    }]
  ]
};
