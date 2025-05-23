module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'airbnb',
        'airbnb/hooks'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', 'src/'],
            },
        },
    },
    ignorePatterns: ['/src/**/__tests__/*', 'src/**/*.js', 'src/**/*containsNullOrUndefined.ts', 'src/react-app-env.d.ts'],
    rules: {
        '@typescript-eslint/no-unsafe-assignment' : 'off',
        '@typescript-eslint/no-unsafe-argument' : 'off',
        '@typescript-eslint/no-unsafe-member-access' : 'off',
        'react/function-component-definition' : 'off',
        '@typescript-eslint/restrict-template-expressions' : 'off',
        '@typescript-eslint/no-unsafe-call' : 'off',
        'no-unsafe-optional-chaining' : 'off',
        '@typescript-eslint/no-unsafe-return' : 'off',
        '@typescript-eslint/no-floating-promises' : 'off',
        'default-param-last' : 'off',
        'function-paren-newline' : 'off',
        'import/no-extraneous-dependencies' : 'off',
        'react-hooks/exhaustive-deps' :'off',

        semi: ['error', 'always'],
        "linebreak-style": 0,
        'jsx-quotes': [2, 'prefer-single'],
        'react/jsx-fragments': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-shadow': 'off',
        'no-console': 'off',
        'max-len': 'off',
        camelcase: 'off',
        'react/no-array-index-key': 'off',
        'react/require-default-props': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', 'tsx'] }], // should add '.ts' if typescript project
        'no-use-before-define': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        'no-nested-ternary' : 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
    },
};
