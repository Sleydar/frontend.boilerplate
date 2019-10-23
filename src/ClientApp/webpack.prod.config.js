const merge = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.config');

const csr = merge(base, {
    target: 'web',
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/app.js'),
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js',
        library: 'boilerplate-app',
        libraryTarget: 'umd',
        publicPath: 'http://localhost:12345',
    },

    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
            umd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
            umd: 'react-dom',
        },
        classnames: {
            root: 'classNames',
            commonjs2: 'classnames',
            commonjs: 'classnames',
            amd: 'classnames',
        },
    },
});

const ssr = merge(base, {
    target: 'node',
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/server/index.js'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [/node_modules\/itas-ui/, /src/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: {
                                            node: 8,
                                        },
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                            plugins: [
                                [
                                    '@babel/plugin-proposal-decorators',
                                    { legacy: true },
                                ],
                                '@babel/plugin-proposal-class-properties',
                            ],
                        },
                    },
                ],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, './build/server'),
        publicPath: 'http://localhost:12345',
        libraryTarget: 'commonjs2',
    },
});

module.exports = [csr, ssr];
