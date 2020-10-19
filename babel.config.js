module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/preset-env',
      {
        forceAllTransforms: true,
        corejs: 3,
        useBuiltIns: 'usage',
        modules: false
      }
    ]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-modules-commonjs',
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: false,
        regenerator: true,
        corejs: false
      }
    ],
  ]
}
