import * as path from 'path';
import * as webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';

export function getWebpackCommonConfig(): any {
  const production = process.env.NODE_ENV === 'production';

  let jsFilename = '[name].js';
  let cssFilename = '[name].css';

  if (production) {
    jsFilename = '[name].[chunkhash:8].js';
    cssFilename = '[name].[contenthash:8].css';
  }

  let config = {
    output: {
      path: path.resolve(process.cwd(), './dist/'),
      filename: jsFilename,
      publicPath: '/',
      chunkFilename: jsFilename,
    },
    resolve: {
      modules: ['node_modules', path.join(__dirname, '../node_modules')],
      extensions: ['.ts', 'tsx', '.js', '.jsx', '.json'],
    },
    devtool: production ? 'source-map' : 'cheap-eval-source-map',
    module: {
      rules: [
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                minetype: 'application/font-woff',
              },
            },
          ],
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                minetype: 'application/octet-stream',
              },
            },
          ],
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                minetype: 'application/vnd.ms-fontobject',
              },
            },
          ],
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                minetype: 'image/svg+xml',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
      ],
    },

    plugins: [
      new CaseSensitivePathsPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
  };

  if (production) {
    config.plugins = [...config.plugins,
      new ExtractTextPlugin({
        filename: cssFilename,
        disable: false,
        allChunks: true,
      }),
      new webpack.optimize.UglifyJsPlugin({
        parallel: true,
        output: {
          ascii_only: true,
        },
        compress: {
          warnings: false,
        },
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      }),
    ];
  } else {
    config.plugins = [...config.plugins,
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
    ];
  }

  return config;
}

export default getWebpackCommonConfig;
