module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS2'],
    singleRun: true,
    frameworks: ['jasmine'],
    files: [
      'toObj.js',
      'toObj__tests.js',
    ],
    reporters: ['progress'],
  });
};
