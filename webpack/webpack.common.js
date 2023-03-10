const Path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

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
	entry: {
		scripts: Path.resolve(__dirname, '../src/scripts/index.js'),
	},
	output: {
		path: Path.join(__dirname, '../build'),
		filename: 'js/[name]-[fullhash:8].js',
		assetModuleFilename: '[path][name][ext]',
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [{ from: Path.resolve(__dirname, '../public'), to: 'public' }],
		}),
	].concat(multipleHtmlPlugins),
	resolve: {
		alias: {
			'~': Path.resolve(__dirname, '../src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.mjs$/,
				type: 'javascript/auto',
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
		],
	},
};
