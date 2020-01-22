module.exports = {
  plugins: ["react", "security", "ramda"],
  rules: {
    "react/react-in-jsx-scope": "off"
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:security/recommended",
    "plugin:ramda/recommended"
  ],
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  }
};
