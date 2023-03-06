module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  env: {
    browser: true,
    node: true,
  },
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    'quote-props': ['error', 'as-needed'],
  },
}