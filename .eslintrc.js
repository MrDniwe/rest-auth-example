module.exports = {
    env: {
        es6: true,
        node: true,
        mocha: true
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        "no-console": ["off"],
        indent: ["error", 2],
        "linebreak-style": ["error", "unix"],
        semi: ["error", "always"]
    }
};
