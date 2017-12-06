import { tmpdir } from 'os';
import * as rucksack from 'rucksack-css';
import * as autoprefixer from 'autoprefixer';

export default function getLoaderOptions() {
  return {
    babel: getBabelOptions(),
    postcss: getPostcssOptions(),
    ts: getTsOptions(),
  };
}

function getBabelOptions() {
  return {
    cacheDirectory: tmpdir(),
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

function getReturnType<R> (f: (...args: any[]) => R): {returnType: R} {
  return null!;
}

let loaderOptionsType = getReturnType(getLoaderOptions);

export type LoaderOptions = typeof loaderOptionsType.returnType;
