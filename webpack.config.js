const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require('webpack');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        app: './themes/isdn2voip/src/index.js'
    },
    output: {
        path: path.join(__dirname, "./themes/isdn2voip/static/dist"),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader', // translates CSS into CommonJS modules
                    }, {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('precss'),
                                    require('autoprefixer')
                                ];
                            }
                        }
                    }, {
                        loader: 'sass-loader' // compiles Sass to CSS
                    },

                ]
            },
            {
                test: /\.(svg|jpg|png|woff(2)?)(\?[a-z0-9]+)?$/,
                use: {
                    loader: "file-loader?name=images/[name].[ext]"
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([{
            from: "favicon/**/*",
            to: "../dist"
        }, {
            from: "images/**/*",
            to: "../dist"
        }]),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            jQuery: 'jquery',
            Popper: ['popper.js', 'default'],
        })
    ],

};