module.exports = {
  stories: ['../frontend/stories/*.stories.mdx', '../frontend/stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /.*\.(?:le|c|sc)ss$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader', // if scss then add 'sass-loader'
      ],
    });
    return config;
  },
};
