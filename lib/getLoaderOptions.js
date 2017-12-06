"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var rucksack = require("rucksack-css");
var autoprefixer = require("autoprefixer");
function getLoaderOptions() {
    return {
        babel: getBabelOptions(),
        postcss: getPostcssOptions(),
        ts: getTsOptions(),
    };
}
exports.default = getLoaderOptions;
function getBabelOptions() {
    return {
        cacheDirectory: os_1.tmpdir(),
        presets: [
            'babel-preset-es2015-ie',
            'babel-preset-react',
            'babel-preset-stage-0',
        ],
        plugins: [
            'babel-plugin-add-module-exports',
            'babel-plugin-transform-decorators-legacy',
        ],
    };
}
function getPostcssOptions() {
    return {
        sourceMap: true,
        plugins: [
            rucksack(),
            autoprefixer({
                browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
            }),
        ],
    };
}
function getTsOptions() {
    return {
        transpileOnly: true,
    };
}
function getReturnType(f) {
    return null;
}
var loaderOptionsType = getReturnType(getLoaderOptions);
