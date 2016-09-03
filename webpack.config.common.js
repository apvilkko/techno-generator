import path from 'path';

export default {
  entry: [
    'babel-polyfill',
    './src/theme/main.less',
    './src/main'
  ],
  output: {
    publicPath: '/',
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        loader: 'style!css!autoprefixer!less'
      },
    ]
  },
  devServer: {
    contentBase: './src'
  }
};
