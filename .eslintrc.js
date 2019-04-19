// https://eslint.org/docs/user-guide/configuring
const switcher = require('./ENV') === 'production' ? 'error' : "off"

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  "extends": "eslint:recommended",
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    // allow debugger during development
    "no-console":  switcher,
    'no-debugger': switcher,

    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // tab or enter key warinring
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 1
  }
}
