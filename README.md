# SoccerReviewerApp

## First Setup / Installation

This app is built on [Ionic Framework](http://ionicframework.com/). To use the Ionic tools, install the following packages:

The following steps are necessary to build/run/use the app

1. Install the app itself by cloning it (you can make your own fork)

```git clone git@github.com:Ugur22/SoccerReviewerApp.git```

2. Use npm install to install all necessary packages

```
cd SoccerReviewerApp
npm install
```

3. Run the app one your local machine/workstation

```ionic serve```

### iOS
Follow instructions to set Current Project Version for fastlane if you did not
set it earlier: https://developer.apple.com/library/content/qa/qa1827/_index.html

```ionic cordova run ios --device --prod```

### Android

```ionic cordova run android --prod --emulator```

## Testing

[Example](https://github.com/driftyco/ionic-unit-testing-example) for unit testing on Ionic 2.

[Example](https://leifwells.github.io/2017/09/05/testing-in-ionic-code-coverage/) add unit testing coverage to project.

### adding unit test coverage to your project 

You can also switch to the ```codeCoverage``` branch for a up and runnig code coverage project.
  

#### step 1 Install the following modules into your project:

```npm install --save-dev karma-coverage-istanbul-reporter istanbul-instrumenter-loader```

#### step 2 Add a new script to your package.json file:
```"test-coverage": "karma start ./test-config/karma.conf.js --coverage",```


#### step 3 add istanbul coverage reporter to your ```karma.config.js``` file as follows:
```
    coverageIstanbulReporter: {
            reports: [ 'html', 'lcovonly' ],
            fixWebpackSourcePaths: true
          },
      
        reporters: config.coverage ? ['kjhtml', 'dots', 'coverage-istanbul'] : ['kjhtml', 'dots'],
```

#### step 4 exclude the test-config folder from the code coverage calculation in the ```webpack.test.js``` as follows:
```
   exclude:[
          /(index.ts|main.ts|test.ts|mocks.ts|\.spec\.ts$)/,
          /test-config/
        ],
```
#### Run the tests

```npm test```

after running the test a lcov.info file will be created in the coverage folder which serves as a coverage file. It will also create a html version with the coverage results in the same folder.

![Example Image of Completed Code Coverage](https://user-images.githubusercontent.com/1648535/30074946-54a36e50-9241-11e7-9ca8-6263d0353c58.png)