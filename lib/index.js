"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getFullWebpackConfig_1 = require("./getFullWebpackConfig");
var getLoaderOptions_1 = require("./getLoaderOptions");
var getWebpackCommonConfig_1 = require("./getWebpackCommonConfig");
function getWebpackConfig() {
    var loaderOptons = getLoaderOptions_1.default();
    var webpackCommonConfig = getWebpackCommonConfig_1.default();
    var webpackConfig = getFullWebpackConfig_1.default(webpackCommonConfig, loaderOptons);
    return webpackConfig;
}
exports.getWebpackConfig = getWebpackConfig;
var getFullWebpackConfig_2 = require("./getFullWebpackConfig");
exports.getFullWebpackConfig = getFullWebpackConfig_2.default;
var getLoaderOptions_2 = require("./getLoaderOptions");
exports.getLoaderOptions = getLoaderOptions_2.default;
var getWebpackCommonConfig_2 = require("./getWebpackCommonConfig");
exports.getWebpackCommonConfig = getWebpackCommonConfig_2.default;
