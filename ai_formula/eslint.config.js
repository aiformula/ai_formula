import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import aiFormula from './eslint-plugin-ai-formula.js'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'ai-formula': aiFormula
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // AI Formula È°èËâ≤Á≥ªÁµ±Ë¶èÂ?
      'ai-formula/no-hardcoded-colors': 'error',
      'ai-formula/use-color-variables': 'error', 
      'ai-formula/no-inline-styles': 'warn',
      
      // È°çÂ??Ñ‰ª£Á¢ºË≥™?èË???
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      
      // TypeScript ?πÂ?Ë¶èÂ?
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      
      // React ?πÂ?Ë¶èÂ?
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },
  },
)
