## AGAR.IO Driver [![Build Status](https://travis-ci.org/scaljeri/agario-driver.svg?branch=master)](https://travis-ci.org/scaljeri/agario-driver) [![Code Climate](https://codeclimate.com/github/scaljeri/agario-driver/badges/gpa.svg)](https://codeclimate.com/github/scaljeri/agario-driver) [![Test Coverage](https://codeclimate.com/github/scaljeri/agario-driver/badges/coverage.svg)](https://codeclimate.com/github/scaljeri/agario-driver/coverage) [![Dependency Status](https://david-dm.org/scaljeri/agario-driver.svg)](https://david-dm.org/scaljeri/agario-driver) [![devDependency Status](https://david-dm.org/scaljeri/agario-driver/dev-status.svg)](https://david-dm.org/scaljeri/agario-driver#info=devDependencies)

[![Join the chat at https://gitter.im/scaljeri/agario-driver](https://badges.gitter.im/scaljeri/agario-driver.svg)](https://gitter.im/scaljeri/agario-driver?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This project manages the environment for an agar.io 
[bot](https://github.com/scaljeri/agario-bot) game play. 

This project provides the following:

   * Facebook login
   * black and white and low res setup
   * Start/stop the game  (restart on game-over if required)
   * Shared libraries for bots
   
The basis for endless bot play :)

The process of creating a bot goes as follows: 

    * Clone [this](https://github.com/scaljeri/agario-bot) 
    * Bundle
    * ....
    
TODO

The bot software (together with some agario-driver libs) will be injected into the browser. The agario-driver libs take care of the communication between the browser and the backend 
[Webdriver](http://www.seleniumhq.org/projects/webdriver/) 


## Backend - Frontend communication


## Chromedriver

is a perfect tool to control pages
like [agario](http://agar.io). In theory you can use any browser, but this project is only tested
with Chrome. Download the Chromedriver from [here](https://sites.google.com/a/chromium.org/chromedriver/downloads)

TODO: Run the executable or is there more ????

## Bundle


Because Webdriver is used to control the page, but the javascript doing all the hard work gets injected 
into the page to boost performance (Webdriver is so extremely slow!)

The code inside `bundle.js` is the code that does the smart stuff, image processing and moving
the bot. The bundle is created as follows:

    $> npm run bundle
    
which is equivalent to

    $> browserify -t [ babelify --presets [ es2015 ] ] src/index.js -o bundle.js
    
## Run tests

Tu run the unit tests 

    $> npm test
    
which is equivalent to

    $> ./node_modules/.bin/mocha --compilers js:babel-core/register --harmony
    
This command uses the `.babelrc` file in order to compile ES2015 to ES5

## Facebook

If you like the bot can play using you Facebook account. For this to work you can provide you
credentials in a file called `facebook.json`. Example file:

    {
        "username": "my-name@facebook.com",
        "password": "my-password"
    }
    
## Snapshots

    $> ./bot.js --facebook --snapshots=./snapshots
    
