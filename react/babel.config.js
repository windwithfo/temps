/**
 * @file babel配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

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
    }],
    '@babel/preset-react'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', {
      legacy: true
    }],
    ['@babel/plugin-proposal-class-properties', { "loose": true }],
    ['styled-jsx/babel', {
      optimizeForSpeed: true,
      plugins: ['styled-jsx-plugin-sass']
    }],
    ['import', {
      libraryName: 'antd',
      style: true
    }]
  ]
};
