module.exports = {
  "env": {
    "es6": true,
    "mocha": true,
  },
  "parserOptions": {
    "sourceType": "module",
  },
  "rules": {
    "no-unused-vars": ["error", { "vars": "all", "args": "none", "ignoreRestSiblings": true }]
  },
  "extends": ["eslint:recommended", "airbnb"]
}
