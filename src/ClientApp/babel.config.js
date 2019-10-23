module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
            },
        ],
        '@babel/preset-react',
    ],
    plugins: [
        'styled-components',
        '@babel/plugin-syntax-dynamic-import',
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        '@babel/plugin-proposal-class-properties',
    ],
    env: {
        production: {
            plugins: [
                'lodash',
                '@babel/plugin-syntax-dynamic-import',
                [
                    '@babel/plugin-proposal-decorators',
                    {
                        legacy: true,
                    },
                ],
                '@babel/plugin-proposal-class-properties',
                'transform-react-remove-prop-types',
                '@babel/plugin-transform-react-inline-elements',
                '@babel/plugin-transform-react-constant-elements',
            ],
        },
        test: {
            plugins: [
                '@babel/plugin-transform-modules-commonjs',
                'dynamic-import-node',
                [
                    '@babel/transform-runtime',
                    {
                        regenerator: true,
                    },
                ],
            ],
        },
    },
};
