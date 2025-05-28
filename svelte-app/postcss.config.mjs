import autoprefixer from 'autoprefixer'
import flexboxfixer from 'postcss-flexboxfixer'
import pxtorem from 'postcss-pxtorem'

export default {
  plugins: [
    autoprefixer(),
    flexboxfixer(),
    pxtorem({
      rootValue: 16,
      propList: ['*'],
    })
  ]
}