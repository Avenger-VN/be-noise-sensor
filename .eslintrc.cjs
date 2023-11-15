module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: [],
  rules: {
    "no-undef": 0,
    "no-async-promise-executor": 0,
  },
  // **`0`** = off, **`1`** = warn, **`2`** = error
}
