//这个是开发版本使用的 js 配置文件 引入 path 模块
const path = require('path');
//引入 webpack 模块
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');
//引入 css 编译插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //入口资源配置  需要编译的文件
    entry: {
        index: [
            path.join(__dirname, '../src/public/scripts/index.es'),
            path.join(__dirname, '../src/public/scripts/indexadd.js')
        ],
        tags: [path.join(__dirname, '../src/public/scripts/tags.es')]
    },
    //资源输出配置    资源输出的路径
    output: {
        //资源输出时的名称 以 MD5 的形式
        filename: 'public/scripts/[name]-[hash:5].js',
        //资源输出时的路径
        path: path.join(__dirname, '../build/')
    },
    module: {
        rules: [
            {
                //这个 .es 正则实际上对应的就是 index.es 和 tags.es 文件
                test: /\.es$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'stage-0']
                    }
                }
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }
                })
            }
        ]
    },
    //配置插件
    plugins: [ //用这个插件定义 进程 的名称，设置 webpack.config.js 中的 process.env.NODE_ENV  方法对应的值
        new webpack.DefinePlugin({
            'process': {
                'NODE_ENV': 'dev'
            }
        }),
        new LiveReloadPlugin({appendScriptTag: true}),
        new ExtractTextPlugin("public/css/[name]-[hash:5].css"),
        new webpack
            .optimize
            .CommonsChunkPlugin({name: 'vendor', filename: 'public/scripts/common/vendor-[hash].min.js'}),
        new HtmlWebpackPlugin({filename: './views/layout.html', template: 'src/widget/layout.html', inject: false}),
        new HtmlWebpackPlugin({
            filename: './views/index.html',
            //这里是用 js 文件拼接来生成的 html 代码 主要是引用了 layout.html 模板和 css 、js 的资源
            template: 'src/views/index.js',
            inject: false,
            //定义文件分发时的名称
            chunks: [
                'vendor', 'index', 'tags'
            ],
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: './widget/index.html',
            //这里引用的是 html 中组件标签
            template: 'src/widget/index.html',
            inject: false
        })
    ]
};