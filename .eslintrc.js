module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "newline-before-return": [1],
        "import/prefer-default-export": [0],
        "no-unused-vars": [1],
        "no-underscore-dangle": [0],
    }
};
