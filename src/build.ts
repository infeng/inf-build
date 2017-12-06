import { join, resolve } from 'path';
import { existsSync } from 'fs';
import * as webpack from 'webpack';
import * as chalk from 'chalk';
import getFullWebpackConfig from './getFullWebpackConfig';
import getLoaderOptions from './getLoaderOptions';
import getWebpackCommonConfig from './getWebpackCommonConfig';

function getWebpackConfig(args) {
  let loaderOptons = getLoaderOptions();
  let webpackCommonConfig = getWebpackCommonConfig();
  let webpackConfig = getFullWebpackConfig(webpackCommonConfig, loaderOptons);

  if (typeof args.config === 'function') {
    webpackConfig = args.config(webpackConfig, loaderOptons) || webpackConfig;
  } else {
    webpackConfig = mergeCustomConfig(
      webpackConfig,
      loaderOptons,
      resolve(args.cwd, args.config || 'webpack.config.js')
    );
  }
  return webpackConfig;
}

function mergeCustomConfig(webpackConfig, loaderOptons, customConfigPath) {
  if (!existsSync(customConfigPath)) {
    return webpackConfig;
  }

  const customConfig = require(customConfigPath);
  /* eslint prefer-rest-params:0 */
  if (typeof customConfig === 'function') {
    return customConfig(webpackConfig, loaderOptons);
  }

  throw new Error(`Return of ${customConfigPath} must be a function.`);
}

export default function build(args, cb) {
  const webpackConfig = getWebpackConfig(args);

  webpackConfig.plugins.push(
    new webpack.ProgressPlugin((percentage, msg, addInfo) => {
      const stream = process.stderr as any;
      if (stream.isTTY && percentage < 0.71) {
        stream.cursorTo(0);
        stream.write(`📦  ${chalk.magenta(msg)} (${chalk.magenta(addInfo)})`);
        stream.clearLine(1);
      } else if (percentage === 1) {
        console.log(chalk.green('\nwebpack: bundle build is now finished.'));
      }
    })
  );

  const compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err || stats.hasErrors()) {
      const buildInfo = stats.toString({
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
