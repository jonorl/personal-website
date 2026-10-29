import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  { ignores: ['dist', 'server/node_modules'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // Config files and build scripts run in Node, not the browser.
    files: ['*.config.js', 'scripts/**'],
    languageOptions: { globals: globals.node },
  },
  {
    // The metrics API, which runs in Node on the VPS.
    files: ['server/**'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['src/__tests__/**'],
    languageOptions: { globals: { ...globals.node, ...globals.jest } },
  },
])
