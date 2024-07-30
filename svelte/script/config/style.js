/**
 * @file svelte项目stylelint配置
 * @author dongkunshan(windwithfo@yeah.net)
 */

module.exports = {
  extends: 'stylelint-config-html/svelte',
  customSyntax: 'postcss-html',
  rules: {
    // 色值定义使用简写
    'color-hex-length': 'short',
    // 字体定义加引号
    'font-family-name-quotes': 'always-unless-keyword',
    // 字符串单行书写
    'string-no-newline': true,
    // 0值无单位
    'length-zero-no-unit': true,
    // 关键词小写
    'value-keyword-case': 'lower',
    // 禁止空规则
    'block-no-empty': true,
  }
};
