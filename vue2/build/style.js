module.exports = {
  extends: 'stylelint-config-html/vue',
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
    // 规则块间留一个空行，第一项和注释除外
    'rule-empty-line-before': ['always',
      {
        except: [
          'first-nested',
          'after-single-line-comment'
        ],
        ignore: ['after-comment']
      }
    ],
    // 选择器命名规则
    'selector-class-pattern': /\S*/,
  }
}
