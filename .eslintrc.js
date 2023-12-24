module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react/no-unstable-nested-components': [
      'off' | 'warn' | 'error',
      {
        allowAsProps: false,
        customValidators:
          [] /* optional array of validators used for propTypes validation */,
      },
    ],
    'react/self-closing-comp': 'off',
  },
};
