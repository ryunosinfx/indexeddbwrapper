//↓↓↓↓追加
const path = require('path');
const webpack = require("webpack");
module.exports = {
	mode: 'development',
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
	plugins: [
		new webpack.LoaderOptionsPlugin({
			// test: /\.xxx$/,  may apply this only for some modules
			options: {
				html: './index.html'
			}
		}, { debug: 'debug' }),
		// new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin(),
	],
	devtool: 'source-map',
	resolve: {
		extensions: ['.js']
	}
};