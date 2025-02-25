import eslint from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import eslintPluginVue from "eslint-plugin-vue"
import globals from "globals"
import typescriptEslint from "typescript-eslint"

export default typescriptEslint.config(
    {
        ignores: [
            "**/*.d.ts",
            "**/coverage",
            "**/dist",
            "assets/",
            "src/dev.ts",
            "tests/**/*",
        ],
    },
    {
        extends: [
            eslint.configs.recommended,
            ...typescriptEslint.configs.recommended,
            ...eslintPluginVue.configs["flat/recommended"],
        ],
        files: ["**/*.{ts,vue}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
            parserOptions: { parser: typescriptEslint.parser },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "warn", // Allow the use of `any`
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "vue/multi-word-component-names": "off", // Disable multi-word component names rule
            "vue/require-default-prop": "off", // Disable requiring default props
            "vue/no-v-html": "off", // Allow v-html usage (if needed)
        },
    },
    eslintConfigPrettier
)
