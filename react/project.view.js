/**
 * @file 入口页面配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

module.exports = {
  index: {
    template: 'html.ejs',
    path: 'view/index/index',
    title: 'index',
    meta: {
      keywords: 'index',
      description: 'index',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  },
  page1: {
    template: 'html.ejs',
    path: 'view/page1/page1',
    title: 'page1',
    meta: {
      keywords: 'page1',
      description: 'page1',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  },
  page2: {
    template: 'html.ejs',
    path: 'view/page2/page2',
    title: 'page2',
    meta: {
      keywords: 'page2',
      description: 'page2',
      viewport: 'initial-scale=1, maximum-scale=1',
      'format-detection': 'telephone=no',
      'format-detection': 'email=no'
    }
  }
}