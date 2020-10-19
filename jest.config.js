module.exports = {
  verbose: true,
  globals: { NODE_ENV: 'test' },
  testURL: 'http://localhost',
  moduleFileExtensions: ['js', 'jsx'],
  testEnvironment: 'jsdom',
  transform: { '.*': 'babel-jest' }
};
