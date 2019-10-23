const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    node: { process: true },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        useBuiltIns: 'entry',
                                        corejs: '3',
                                    },
                                ],
                                '@babel/preset-react',
                            ],
                            plugins: [
                                '@babel/plugin-syntax-dynamic-import',
                                [
                                    '@babel/plugin-proposal-decorators',
                                    { legacy: true },
                                ],
                                '@babel/plugin-transform-runtime',
                                '@babel/plugin-proposal-class-properties',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            import: true,
                            modules: {
                                localIdentName: '[local]_[hash:base64:4]',
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                // eslint-disable-next-line global-require
                                require('postcss-focus-within'),
                                // eslint-disable-next-line global-require
                                require('autoprefixer')({
                                    grid: true,
                                }),
                                // eslint-disable-next-line global-require
                                require('css-mqpacker'),
                            ],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
            {
                test: /\.(svg|png|eot|ttf|woff|woff2|bmp|wav|gif|jpe?g)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
                use: 'url-loader?limit=10000&name=fonts/[hash].[ext]',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, './src/assets/'),
            },
        ]),
        new webpack.DefinePlugin({
            'global.GENTLY': false,
            PUBLIC_URL:
                process.env.PUBLIC_URL instanceof String
                    ? process.env.PUBLIC_URL
                    : JSON.stringify(process.env.PUBLIC_URL),
        }),
    ],
};
