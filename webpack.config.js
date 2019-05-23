module.exports = {
  mode: 'production',
  entry: {
      components: ['./src/components/index.js', './src/styles/contemporary.scss', './src/styles/minimal.scss']
  },
  output: {
      path: __dirname + '/dist',
      filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'css/[name].css'
            }
          },
          'extract-loader',
          'css-loader?-url',
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    port: 1234
  }
}
