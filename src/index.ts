import getFullWebpackConfig from './getFullWebpackConfig';
import getLoaderOptions from './getLoaderOptions';
import getWebpackCommonConfig from './getWebpackCommonConfig';

export function getWebpackConfig() {
  let loaderOptons = getLoaderOptions();
  let webpackCommonConfig = getWebpackCommonConfig();
  let webpackConfig = getFullWebpackConfig(webpackCommonConfig, loaderOptons);

  return webpackConfig;
}

export { default as getFullWebpackConfig } from './getFullWebpackConfig';
export { default as getLoaderOptions } from './getLoaderOptions';
export { default as getWebpackCommonConfig } from './getWebpackCommonConfig';
