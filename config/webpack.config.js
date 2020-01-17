const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, '../', 'dist'),
		filename: '[name].js',
	},
	module: {
		rules: [
			{
				test: /\.(sass|scss)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.svg/,
				use: {
					loader: 'svg-url-loader',
					options: {},
				},
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'assets',
							publicPath: 'assets',
						},
					},
					{
						loader: 'image-webpack-loader',
					},
				],
			},
			{
				test: /\.js$/,
				loader: ['babel-loader'],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			publicPath: '../',
		}),
		// new CopyPlugin([
		// 	{
		// 		from: 'src/assets',
		// 		to: 'assets',
		// 	},
		// ]),
	],
};
