import * as path from 'path';

export default {
  entry: [
    path.resolve(__dirname, 'src/client/index')
  ],
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'src/client'),
    publicPath: '/'
  }
};