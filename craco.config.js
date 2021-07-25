const CracoAlias = require('craco-alias');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      // Extract CSS during build
      {
        test: /\.s[ac]ss$/i,
        use: [
          ExtractTextPlugin.extract('style', 'css'),
          ExtractTextPlugin.extract('style', 'scss'),
        ],
      },
    ],
  },
  plugins: [
    // Output extracted CSS to a file
    { plugin: new ExtractTextPlugin('[name].[chunkhash].css') },
    { plugin: new ExtractTextPlugin('[name].[chunkhash].scss') },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        // baseUrl SHOULD be specified
        // plugin does not take it from tsconfig
        baseUrl: '.',
        /* tsConfigPath should point to the file where "baseUrl" and "paths"
        are specified*/
        tsConfigPath: './tsconfig.base.json',
      },
    },
  ],
};
