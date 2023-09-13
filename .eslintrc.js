module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};
