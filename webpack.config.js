const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    target: 'node',
    entry: path.resolve(__dirname, 'dist/index.js'),
    output: {
        filename: 'main.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    externals: [nodeExternals()],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
                extractComments: false
            })
        ]
    }
};
