import wepy from 'wepy'

/**
 * 去首位空格
 *
 * @param {String} str 源字符串
 *
 * @return {String} 处理后字符串
 */
export function trim(str) {
  return str.replace(/^\s+|\s+$/g, '')
}

/**
 * toast封装
 *
 * @param {String=} title 源字符串
 * @param {String=} icon 图标 success|loading|none
 * @param {String=} image 自定义图标
 *
 * @return {String} 处理后字符串
 */
export function toast(title = '服务异常', icon = 'none', image = '') {
  wepy.showToast({
    title,
    icon,
    image
  })
}
