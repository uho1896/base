module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2015,
    'sourceType': 'module'
  },
  'rules': {
    // 缩进
    'indent': 0,
    'linebreak-style': 0,
    // 引号
    'quotes': [
      1,
      'single'
    ],
    // 分号结尾
    'semi': 0,
    'no-unused-vars': [2, {
      // 允许声明未使用变量
      'vars': 'local',
      // 参数不检查
      'args': 'none'
    }],
    // 最大空行100
    'no-multiple-empty-lines': [0, { 'max': 100 }],
    'no-mixed-spaces-and-tabs': 0,
    //不能使用console
    'no-console': 'off',
    //未定义变量不能使用
    'no-undef': 0,
    //一行结束后面不要有空格
    'no-trailing-spaces': 1,
    //强制驼峰法命名
    'camelcase': 2,
    //对象字面量项尾不能有逗号
    'comma-dangle': 0,
    //this别名
    'consistent-this': 0,
  }
}