const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
	mode = 'production';
}

let htmlPageNames = [];
const pages = fs.readdirSync('./src');
pages.forEach(page => {
	if (page.endsWith('.html')) {
		htmlPageNames.push(page.split('.html')[0]);
	}
});
const multipleHtmlPlugins = htmlPageNames.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/${name}.html`,
		filename: `${name}.html`,
	});
});

module.exports = {
	mode: mode,
	devServer: {
		hot: true,
	},
	entry: {
		scripts: Path.resolve(__dirname, './src/index.js'),
	},
	output: {
		path: Path.join(__dirname, './build'),
		filename: 'js/[name]-[hash:8].js',
		assetModuleFilename: 'assets/[name]-[hash:8][ext][query]',
		clean: true,
	},
	devtool: 'source-map',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		// new Webpack.DefinePlugin({
		// 	'process.env.NODE_ENV': JSON.stringify('development'),
		// }),
		new MiniCssExtractPlugin({
			filename: 'bundle-[hash:8].css',
		}),
		// new HtmlWebpackPlugin({
		// 	template: Path.resolve(__dirname, './src/index.html'),
		// 	filename: 'index.html',
		// }),
		// new Webpack.optimize.ModuleConcatenationPlugin(),
		new CopyWebpackPlugin({
			patterns: [{ from: Path.resolve(__dirname, '../public'), to: 'public' }],
		}),
	].concat(multipleHtmlPlugins),
	// resolve: {
	// 	alias: {
	// 		'~': Path.resolve(__dirname, './src'),
	// 	},
	// },
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: 'html-loader',
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
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
				test: /\.(ico|jpg|jpeg|png|gif|webp|tiff|svg)(\?.*)?$/,
				type: 'asset/resource',
			},
			{
				test: /\.(mp4|mp3|ogg|wav|pdf|docx|doc|xls|xlsx)(\?.*)?$/,
				type: 'asset/resource',
			},
			{
				test: /\.(eot|otf|fnt|ttf|woff|woff2)(\?.*)?$/,
				type: 'asset/resource',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
};
