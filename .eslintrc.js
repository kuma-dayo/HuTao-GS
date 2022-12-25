module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/ban-types": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "no-empty": 0,
    "no-control-regex": 0,
    "prefer-const": 0,
    "no-constant-condition": 0,
    "no-fallthrough": 0,
    "no-async-promise-executor": 0,
    "no-case-declarations": 0,
  },
}
