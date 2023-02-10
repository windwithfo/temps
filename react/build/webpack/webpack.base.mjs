/**
 * @file 基础配置
 * @author dongkunshan(windwithfo@yeah.net)
 */
import path   from 'path'
import config from './project.config.mjs'

const entry = config.view || [{ page: 'index', path: 'view/index' }]
const entrys = {}
entry.forEach((item) => {
  entrys[item.page] = item.path
})

const webpackConfig = {
  entry: entrys,
  resolve: {
    modules: [
      'node_modules',
      process.cwd() + '/node_modules'
    ],
    alias: {
      '~': process.cwd() + '/src',
      component: process.cwd() + '/src/components',
      asset: process.cwd() + '/src/assets',
      view: process.cwd() + '/src/views'
    },
    extensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          },
        ],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.(wav|ogg|mp3)(\?.*)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset/resource'
      }
    ]
  },
}

if (config.alias) {
  Object.keys(config.alias).forEach((item) => {
    webpackConfig.resolve.alias[item] = path.resolve(process.cwd(), config.alias[item])
  })
}

export default webpackConfig
