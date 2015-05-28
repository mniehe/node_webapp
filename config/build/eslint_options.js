module.exports = {
  envs: {
    node: true,
    amd: true,
    mocha: true,
    browser: true,
    es6: true
  },
  
  rules: {
    "quotes": [ 2, "single", "avoid-escape" ],
    "comma-dangle": "always",
    "no-invalid-regexp": true,
    "no-irregular-whitespace": true,
    "no-duplicate-case": true,
    "no-empty": true,
    "curly": true,
    "no-eq-null": true,
    "yoda": true,
    "brace-style": "1tbs",
    "no-mixed-spaces-and-tabs": true,
    "one-var": true,
    "space-after-keywords": true,
    "space-return-throw-case": true,
    "no-nested-ternary": true,
    "no-lonely-if": true,
    "new-cap": true,
    "key-spacing": [ 2, { "align": "colon", "beforeColon": false, "afterColon": true } ],
    "no-trailing-spaces": true,
    "space-before-function-paren": [ 2, {"anonymous": "always", "named": "never"} ],
    "semi-spacing": [ 2, {"before": false, "after": true} ],
    "indent": [2, 2, {"indentSwitchCase": true}],
    "no-array-constructor": true,
    "comma-style": [2, "last"],
    "dot-location": [2, "property"]
  }
};