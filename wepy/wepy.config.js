const path = require('path');
const cssnext = require('cssnext');
const eslint = require('@wepy/plugin-eslint');
const TypeScriptCompiler = require('@wepy/compiler-typescript');
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  static: ['static'],
  build: {
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env',
        // @babel/preset-typescript'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator'
      ]
    },
    postcss: {
      plugins: [
        cssnext({
          browsers:['iOS 9', 'Android 4.4']
        })
      ],
      map: {
        inline: true
      }
    }
  },
  plugins: [
    eslint({
      fix: true
    }),
    TypeScriptCompiler({
      "compileOnSave": false,
      "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "jsx": "preserve",
        "allowJs": true,
        "moduleResolution": "node",
        "allowSyntheticDefaultImports": true,
        "noUnusedLocals": true,
        "experimentalDecorators": true,
        "noUnusedParameters": true,
        "removeComments": false,
        "preserveConstEnums": true,
        "sourceMap": true,
        "skipLibCheck": true,
        "baseUrl": ".",
        "typeRoots": [
          "./node_modules/@types",
          "./@types"
        ],
        "lib": [
          "dom",
          "es2017"
        ],
        "paths": {
          "@": ["src"],
          "component": ["src/components"],
          "asset": ["src/assets"],
          "view": ["src/pages"]
        }
      }
    }
    )
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

