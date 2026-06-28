import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

export default defineConfig([
    {
        ignores: ['dist/'],
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    tsEslint.configs.recommended,

    {
        rules: {
            curly: ['error', 'multi-line'],
            'arrow-body-style': ['error', 'as-needed'],
            'object-shorthand': ['error', 'always'],
            yoda: ['error', 'always'],
            'no-useless-rename': 'error',
        },
    },
]);
