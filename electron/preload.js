/**
 * @file 预加载配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

// 开发环境关闭安全警告提示
window.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})