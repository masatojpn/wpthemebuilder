module.exports = {
  // [git]https://github.com/stylelint/stylelint-config-standard
  "extends": "stylelint-config-standard",

  "plugins": [
    "stylelint-order"
  ],

  "rules": {
    "order/order": [
      "custom-properties",
      "declarations"
    ],
    "at-rule-no-unknown":[true, {
      "ignoreAtRules": ["value", "for", "media", "if", "each", "mixin", "content", "include", "function", "import", "else", "extend"]
    }],
    "order/properties-alphabetical-order": true,
    "indentation": 2,
    "string-quotes": "double",
    "no-duplicate-selectors": true,
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-named": "never",
    "selector-combinator-space-after": "always",
    "declaration-block-trailing-semicolon": "always",
    "declaration-no-important": true,
    "declaration-colon-space-before": "never",
    "declaration-colon-space-after": "always",
    "number-leading-zero": "always"
  }
}