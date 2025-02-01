module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'eslint:recommended',
    'next',
    'prettier'],
  rules: {

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
};
