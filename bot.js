#!./node_modules/.bin/babel-node

import webdriver from 'selenium-webdriver';
import Facebook from './src/game/facebook';
import Promise from 'promise';

let browser = new webdriver.Builder().usingServer().withCapabilities({
    'browserName': 'chrome',
    'reuse_browser': true
}).build();

const WIDTH = 100,
     HEIGHT = 100;

let [useFacebook] = checkArgv('facebook');

function checkArgv(...options) {
   let index, output = [];

   process.argv.forEach((arg) => {
        if ( (index = options.indexOf(arg.replace(/-/g, ''))) >= 0) {
            output[index] = true;
        }
   }) ;

   return output;
}
