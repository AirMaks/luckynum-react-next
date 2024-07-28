module.exports = {
    extends: ["next", "prettier"],
    rules: {
        "prettier/prettier": [
            1,
            {
                tabWidth: 4,
                semi: true,
                bracketSameLine: true,
                bracketSpacing: true,
                printWidth: 150,
                arrowParens: "avoid",
                endOfLine: "auto",
                trailingComma: "none"
            }
        ],
        quotes: [
            2,
            "double",
            {
                avoidEscape: true
            }
        ],
        "arrow-parens": ["error", "as-needed"],
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "always"
            }
        ],
        semi: [2, "always"],
        "comma-dangle": 0,
        "react/display-name": [
            0,
            {
                ignoreTranspilerName: true
            }
        ],
    },
    plugins: ["prettier"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ["next.config.mjs", ".eslintrc.js"]
};
