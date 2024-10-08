const path = require('path');

const config = () => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react'], // Corrected from "presents" to "presets"
          },
        },
      ],
    },
  };
};

module.exports = config;
