import { LoaderOptions } from './getLoaderOptions';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function getFullWebpackConfig(webpackConfig, loaderOptions: LoaderOptions) {
  const production = process.env.NODE_ENV === 'production';

  const hasSourcemap = !production;

  webpackConfig.module.rules.push(
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: loaderOptions.babel,
        },
      ],
    },
    {
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
    }
  );

  // css

  let cssRules: any[] = [
    {
      test(filePath) {
        return /\.css$/.test(filePath) && !/\.module\.css$/.test(filePath);
      },
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: hasSourcemap,
          },
        },
        {
          loader: 'postcss-loader',
          options: loaderOptions.postcss,
        },
      ],
    },
    {
      test: /\.module\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: hasSourcemap,
            modules: true,
            localIdentName: '[local]___[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
          options: loaderOptions.postcss,
        },
      ],
    },
    {
      test(filePath) {
        return /\.less$/.test(filePath) && !/\.module\.less$/.test(filePath);
      },
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: hasSourcemap,
          },
        },
        {
          loader: 'postcss-loader',
          options: loaderOptions.postcss,
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: hasSourcemap,
          },
        },
      ],
    },
    {
      test: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: hasSourcemap,
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
            sourceMap: hasSourcemap,
          },
        },
      ],
    },
  ];
  if (production) {
    cssRules = cssRules.map(rule => {
      return {
        test: rule.test,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: rule.use.slice(1),
        }),
      };
    });
  }

  webpackConfig.module.rules = webpackConfig.module.rules.concat(cssRules);

  return webpackConfig;
}
