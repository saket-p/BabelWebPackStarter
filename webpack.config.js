const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './build'
    },
    output: {
        filename: 'bundle.es5.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [
            {
                //test both js & mjs (ES Modules) files
                test: /\.m?js$/, 
                use: {
                    loader: 'babel-loader?cacheDirectory=true'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: 'index.html', to: 'index.html' },
            { from: 'src', to: 'src' },
            { from: 'assets', to: 'assets' }
        ])
    ]
};
