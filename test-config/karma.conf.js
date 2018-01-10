var webpackConfig = require('./webpack.test.js');

module.exports = function (config) {
    var _config = {
        logLevel: config.LOG_DEBUG,
        basePath: '',
        frameworks: ['jasmine','karma-typescript'],

        files: [
            {
              pattern: './karma-test-shim.js',
              watched: true
            },
          ],
      
    
          preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap']
          },
        

        coverageIstanbulReporter: {
            reports: [ 'html', 'lcovonly' ],
            fixWebpackSourcePaths: true
          },
      

        reporters: config.coverage ? ['kjhtml', 'dots', 'coverage-istanbul'] : ['kjhtml', 'dots'],


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

        exclude: ["src/**/*.d.ts"],

        coverageReporter: {
            type: 'in-memory'
          },
    
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true
    };

    config.set(_config);
};
