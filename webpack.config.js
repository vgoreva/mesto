const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            template: './src/index.html'
        }),
    new MiniCssExtractPlugin()],
    module: {
        rules: [
            
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 
                    {
                    loader: 'css-loader',
                    options: { importLoaders: 1 }
                  },

                  'postcss-loader']
                }, 
                
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name].[hash][ext]',
               }
               },
               
               {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name].[hash][ext]',
                    }
               },
        ],
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'),
        compress: true,
        port: 8080,

        open: true
    },
}