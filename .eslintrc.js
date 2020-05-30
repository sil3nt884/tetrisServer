'use strict'

module.exports = {
  extends: 'standard',
  rules: {
    'one-var': 'off',
    'max-len': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }]
  }
}
