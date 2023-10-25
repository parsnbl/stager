// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
const { loader } = MiniCssExtractPlugin;

const isProduction = false; //process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? loader : 'style-loader';

//reimplementing dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const config = {
  entry: path.join(__dirname, 'src', 'client', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  mode: isProduction ? 'production' : 'development',
  devServer: {
    host: 'localhost',
    hot: true,
    port: 8081,
    // fallback to root for other urls
    historyApiFallback: true,

    static: {
      // match the output path
      directory: path.resolve(__dirname, 'dist'),
      // match the output 'publicPath'
      publicPath: '/',
    },

    headers: { 'Access-Control-Allow-Origin': '*' },
    /**
    * proxy is required in order to make api calls to
    * express server while using hot-reload webpack server
    * routes api fetch requests from localhost:8080/api/* (webpack dev server)
    * to localhost:3000/api/* (where our Express server is running)
    */
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'client', 'index.html'),
    }),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [!isProduction && import.meta.resolve('react-refresh/babel')].filter(Boolean)
        }
      },
      {
        test: /\.css$/i,
        use: [stylesHandler,'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

export default () => {
  
  if (isProduction) {
    config.mode = 'production';
    config.plugins.push(new MiniCssExtractPlugin());
      
      
  } else {
    config.mode = 'development';
    config.plugins.push(new ReactRefreshWebpackPlugin()); 
  }
  return config;
};
