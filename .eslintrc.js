module.exports = {
  extends: ['next/core-web-vitals',
    'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',

  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {},
      typescript: {
        project: './tsconfig.json'
      }
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', 'src/iconify-bundle/*'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off'
      }
    }
  ]
}
