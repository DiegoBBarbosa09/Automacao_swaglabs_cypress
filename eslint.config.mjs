import { FlatCompat } from "@eslint/eslintrc";
import cypressPlugin from "eslint-plugin-cypress";
import prettierPlugin from "eslint-plugin-prettier";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Obter o diretório do arquivo atual
const __dirname = dirname(fileURLToPath(import.meta.url));

// Cria uma instância compatível do FlatCompat
const compat = new FlatCompat({
  baseDirectory: __dirname, // Utiliza o diretório atual
});

const config = [
  {
    ignores: ["node_modules/", "cypress/reports/**"],
    files: ["**/*.js", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        Cypress: "readonly",
        cy: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
      },
    },
    plugins: {
      cypress: cypressPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", // Aplica Prettier como erro
      "indent": ["error", 2],
      "max-len": ["error", 150, { ignoreComments: true, ignoreUrls: true }],
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "curly": "error",
      "prefer-arrow-callback": "error",
      "no-var": "error",
      "consistent-return": "error",
      "space-infix-ops": "error",
      "eol-last": ["error", "always"],
      "semi": ["error", "always"],
    },
  },
  // Configuração específica para testes Cypress
  {
    files: ["**/*.spec.js", "**/*.cy.js"],
    plugins: {
      cypress: cypressPlugin,
      prettier: prettierPlugin,
    },
    languageOptions: {
      globals: {
        Cypress: true,
        cy: true,
        describe: true,
        it: true,
        before: true,
      },
    },
    ...compat.recommendedConfig,
  },
];

export default config;
