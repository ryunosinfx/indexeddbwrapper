//↓↓↓↓追加
const path = require('path');
const webpack = require("webpack");
module.exports = {
	// mode: 'development',
	//  context: __dirname,
	entry: {
		bundle: './index.js'
	},
	// [
	//   './src/main.js','./src/worker.js', './index.css'
	// ],
	output: {
		// 出力するファイル名
		filename: 'bundle.js',
		// 出力先のパス
		path: __dirname + "/dest",
		publicPath: "/dest/",
		libraryTarget: 'var',
		library: 'indexeddbwrapper',
		globalObject: 'this'
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			enforce: 'pre',
			use: [{
				loader: 'eslint-loader'
			}]
		}]
	},
	devServer: {
		publicPath: "/",
		contentBase: __dirname + "/",
		watchContentBase: true,
		// inline: true,
		// host: '0.0.0.0',
		port: 8083
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			// test: /\.xxx$/,  may apply this only for some modules
			options: {
				html: './index.html'
			}
		}, { debug: 'debug' }),
		// new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	],
	devtool: 'source-map',
	resolve: {
		extensions: ['.js']
	}
};