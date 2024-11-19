module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest', // Make sure Babel handles JS files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!chai|chai-http)', // Ensure Chai, Mongoose, and Sinon are processed by Babel
  ],
};
