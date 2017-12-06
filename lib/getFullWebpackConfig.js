"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExtractTextPlugin = require("extract-text-webpack-plugin");
function getFullWebpackConfig(webpackConfig, loaderOptions) {
    webpackConfig.module.rules.push({
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: loaderOptions.babel,
            },
        ],
    }, {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'babel-loader',
                options: loaderOptions.babel,
            },
            {
                loader: 'ts-loader',
                options: loaderOptions.ts,
            },
        ],
    });
    // css
    webpackConfig.module.rules.push({
        test: function (filePath) {
            return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
        },
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: loaderOptions.postcss,
                },
            ],
        }),
    }, {
        test: /\.module\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: '[local]___[hash:base64:5]',
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: loaderOptions.postcss,
                },
            ],
        }),
    }, {
        test: function (filePath) {
            return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
        },
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: loaderOptions.postcss,
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        }),
    }, {
        test: /\.module\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                        modules: true,
                        localIdentName: '[local]___[hash:base64:5]',
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: loaderOptions.postcss,
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                    },
                },
            ],
        }),
    });
    return webpackConfig;
}
exports.default = getFullWebpackConfig;
