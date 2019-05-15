module.exports = {
    mode: 'production',
    entry: {
        components: './src/components/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    }
}