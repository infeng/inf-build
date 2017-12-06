"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var webpack = require("webpack");
var chalk = require("chalk");
var getFullWebpackConfig_1 = require("./getFullWebpackConfig");
var getLoaderOptions_1 = require("./getLoaderOptions");
var getWebpackCommonConfig_1 = require("./getWebpackCommonConfig");
function getWebpackConfig(args) {
    var loaderOptons = getLoaderOptions_1.default();
    var webpackCommonConfig = getWebpackCommonConfig_1.default();
    var webpackConfig = getFullWebpackConfig_1.default(webpackCommonConfig, loaderOptons);
    if (typeof args.config === 'function') {
        webpackConfig = args.config(webpackConfig, loaderOptons) || webpackConfig;
    }
    else {
        webpackConfig = mergeCustomConfig(webpackConfig, loaderOptons, path_1.resolve(args.cwd, args.config || 'webpack.config.js'));
    }
    return webpackConfig;
}
function mergeCustomConfig(webpackConfig, loaderOptons, customConfigPath) {
    if (!fs_1.existsSync(customConfigPath)) {
        return webpackConfig;
    }
    var customConfig = require(customConfigPath);
    /* eslint prefer-rest-params:0 */
    if (typeof customConfig === 'function') {
        return customConfig(webpackConfig, loaderOptons);
    }
    throw new Error("Return of " + customConfigPath + " must be a function.");
}
function build(args, cb) {
    var webpackConfig = getWebpackConfig(args);
    webpackConfig.plugins.push(new webpack.ProgressPlugin(function (percentage, msg, addInfo) {
        var stream = process.stderr;
        if (stream.isTTY && percentage < 0.71) {
            stream.cursorTo(0);
            stream.write("\uD83D\uDCE6  " + chalk.magenta(msg) + " (" + chalk.magenta(addInfo) + ")");
            stream.clearLine(1);
        }
        else if (percentage === 1) {
            console.log(chalk.green('\nwebpack: bundle build is now finished.'));
        }
    }));
    var compiler = webpack(webpackConfig);
    compiler.run(function (err, stats) {
        if (err || stats.hasErrors()) {
            var buildInfo = stats.toString({
                colors: true,
                children: true,
            });
            console.log(stats.toString(buildInfo));
            return;
        }
        console.log(stats.toString({
            colors: true,
            children: false,
            modules: false,
        }));
    });
}
exports.default = build;
