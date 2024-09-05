import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["src/**/*.js", "src/**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
      "prettier": prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "eqeqeq": "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
      "no-console": "warn",
      "curly": "error",
      "semi": ["error", "always"],
      // "quotes": ["error", "single"], // 이 라인을 제거합니다.
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "indent": ["error", 2],
      "comma-dangle": ["error", "always-multiline"],
    },
  },
];
