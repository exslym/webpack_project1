const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	output: {
		chunkFilename: 'js/[name].chunk.js',
	},
	devServer: {
		hot: true,
	},
	devtool: 'source-map',
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											//Options
										},
									],
								],
							},
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			// {
			// 	test: /\.js$/,
			// 	type: 'javascript/auto',
			// },
			// {
			// 	test: /\.js$/,
			// 	include: Path.resolve(__dirname, '../src'),
			// 	enforce: 'pre',
			// 	loader: 'eslint-loader',
			// 	options: {
			// 		emitWarning: true,
			// 	},
			// },
		],
	},
});
