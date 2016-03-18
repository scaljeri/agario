#!./node_modules/.bin/babel-node

import webdriver from 'selenium-webdriver';
import Promise from 'promise';

import Facebook from './src/game/facebook';
import Agario from './src/game/agario-setup';

const WIDTH = 100,
    HEIGHT = 100,
    ARGVS = ['facebook'];

function checkArgv(...options) {
    let index, output = [];

    process.argv.forEach((arg) => {
        if ((index = options.indexOf(arg.replace(/-/g, ''))) >= 0) {
            this.settings[options[i]] = true;
        }
    });

    return output;
}

class Bot {
    constructor() {
        this.settings = {};
        this.parseArgvs('facebook');

        this.agario = new Agario();

        this.browser = new webdriver.Builder().usingServer().withCapabilities({
            'browserName': 'chrome',
            'reuse_browser': true
        }).build();

        this.browser.get('http://agar.io').then(::this.setup);
    }

    parseArgvs() {
        let index;

        process.argv.forEach((arg) => {
            if ((index = ARGVS.indexOf(arg.replace(/-/g, ''))) >= 0) {
                this.settings[options[i]] = true;
            }
        });
    }

    setup() {
        if (this.settings.facebook) {
            Facebook.login(browser, webdriver)
                .then(() => {
                    this.agario.setup().then(() => {
                        browser.manage().window().setSize(WIDTH, HEIGHT)
                            .then(play);
                    })
                });
        } else {
            agario.then(() => {
                browser.manage().window().setSize(WIDTH, HEIGHT)
                    .then(play);
            })
        }
    }

    play() {
        // Everything is ready, lets play
        //this.browser.close():
    }
}

new Bot();
