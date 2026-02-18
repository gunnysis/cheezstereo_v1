module.exports = function (api) {
  const isTest = api.env('test');
  api.cache(true);
  return {
    presets: isTest
      ? [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
          ['@babel/preset-react', { runtime: 'automatic' }],
        ]
      : [
          ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
          'nativewind/babel',
        ],
    plugins: isTest ? [] : ['react-native-reanimated/plugin'],
  };
};
