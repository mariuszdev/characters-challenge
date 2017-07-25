module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 2017,
      "sourceType": "module",
    },
    "extends": [
      "eslint:recommended",
      "google",
    ],
    "plugins": [
    ],
    "env": {
      "node": true,
      "es6": true,
    },
    "rules": {
      "no-console": "off",
      "require-jsdoc": "off",
      "max-len": ["error", 120],
    }
};
