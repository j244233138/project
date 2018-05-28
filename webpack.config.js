/**
 * Created by j244233138 on 2018/4/19.
 */
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
const BabiliPlugin = require("babili-webpack-plugin"); //压缩插件
module.exports = {
    devServer:{
      historyApiFallback:true//详细报出什么错误
    },
    // performance:{
    //   hints:'warning',
    //   maxEntrypointSize:1000000,
    //   maxAssetSize:450000,
    // },限制文件打包大小，报警告
    context: __dirname + '/src',
    devtool: debug ? "inline-sourcemap" : null,
    // entry: "./js/root.js",
    entry:{
      app:"./js/root.js",
      vendor:['react'],
    }, //压缩分离app, vendor文件
    // devtool:'source-map', //在浏览器中source中可看到源码 没有将源码整合到一行 在webpack中可找到
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs'], //添加组件的插件配置
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
              },
              {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            }
        ]
    },
    output: {
        path: __dirname + '/src/',
        // filename: "bundle.js"
         filename: "[name].js"
    },
    plugins: debug ? [] : [
      new BabiliPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      })// 分离出app，vendor inhdex页面引用的是这两个文件不是build.js
    ],

};
