module.exports = {
    mode: 'production',
    entry: {
        components: ['./src/components/index.js', './src/styles/contemporary.scss']
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
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
    }
}
