import { FlatCompat } from '@eslint/eslintrc';
import cypressPlugin from 'eslint-plugin-cypress';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const config = [
    {
        ignores: ['node_modules/', 'cypress/reports/**'],
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                Cypress: 'readonly',
                cy: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                before: 'readonly'
            },
        },
        plugins: {
            cypress: cypressPlugin,
        },
        rules: {
            "indent": ["error", 4],
            "max-len": ["error", 200, { "ignoreComments": true, "ignoreUrls": true }],
            "no-unused-vars": "warn",
            "no-console": ["warn", { "allow": ["warn", "error"] }],
            "prefer-const": "error",
            "curly": "error",
            "prefer-arrow-callback": "error",
            "no-var": "error",
            "consistent-return": "error",
            "space-infix-ops": "error",
            "eol-last": ["error", "always"],
            "semi": ["error", "always"]
        },
    },
    {
        files: ['**/*.spec.cy.js', '**/*.cy.js'],
        plugins: {
            cypress: cypressPlugin,
        },
        languageOptions: {
            globals: {
                Cypress: true,
                cy: true,
                describe: true,
                it: true,
                before: true
            },
        },
        ...compat.recommendedConfig,
    },
];
export default config;
