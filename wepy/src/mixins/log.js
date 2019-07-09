import wepy from 'wepy'

class LogMixin extends wepy.mixin {
  onRoute() {
    console.log('mixin onRoute')
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}

export default LogMixin
