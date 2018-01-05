var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            {pattern: './karma-test-shim.js', watched: true}
        ],

        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap'],
            '../src/app/**/*.ts':['typescript','coverage']//,
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        browserConsoleLogOptions: {
            level: 'log',
            format: '%b %T: %m',
            terminal: true
        },

        coverageReporter: {
            type: 'in-memory'
          },

        remapCoverageReporter: {
            'text-summary': null, // to show summary in console
            'lcovonly': './coverage/lcov',
            html: './coverage/html'
          },
        reporters: ['progress', 'coverage', 'remap-coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    };

    config.set(_config);
};
