module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      ['module-resolver', {
        root: ['./'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@types': './src/types',
          '@themes': './src/themes',
          '@services': './src/services',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@assets': './src/assets',
          '@locales': './src/locales',
        }
      }]
    ]
  };
};