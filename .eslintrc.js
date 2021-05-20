module.exports = {
  env: {
    es2020: true,
    'react-native/react-native': true,
    node: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      // "jsx": true,
      tsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: ['react', '@typescript-eslint', 'react-native'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 0,
    'react/style-prop-object': 0,
    'react/prop-types': 0,
    'consistent-return': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': 2,
    // 'react-native/no-single-element-style-arrays': 2
  }
};
