// jest.config.js
module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest', // Make sure Babel handles JS files
    },
    transformIgnorePatterns: [
      '/node_modules/(?!chai)/',
      '/node_modules/(?!mongoose)/'
       // Ensure Chai is processed by Babel
    ],
  };
  