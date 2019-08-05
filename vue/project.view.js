/**
 * @file 入口页面配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

module.exports = {
  index: {
    template: 'html.ejs',
    show: true,
    path: 'view/index/index',
    title: 'home',
    meta: {
      keywords: 'home',
      description: 'home',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  },
  list: {
    template: 'html.ejs',
    show: true,
    path: 'view/list/list',
    title: 'list',
    meta: {
      keywords: 'list',
      description: 'list'
    }
  }
}
