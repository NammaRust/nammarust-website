import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import nextPlugin from '@next/eslint-plugin-next'

export default tseslint.config(
  // 1. Ignore Next.js build output
  { ignores: ['.next', 'dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    plugins: {
      'react-hooks': reactHooks,
      '@next/next': nextPlugin,
    },
    rules: {
      // Load React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // Load Next.js recommended & core web vitals rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // 2. Required for Next.js server-side code
      },
    },
  }
)
