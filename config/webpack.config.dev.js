const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        script: './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../', 'build'),
        assetModuleFilename: 'assets/[name][ext][query]'
    },
    devServer: {
        open: true,
        static: path.resolve(__dirname, '../', 'public'),
        port: 5001
    },
    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(jpg|png|svg|gif|jpeg|mp3)$/,
                type: 'asset/resource'
            },
            // {
            //     test: /\.json$/,
            //     loader: 'json-loader'
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['@babel/preset-env', { useBuiltIns: 'usage' }]
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        })
    ]
}
