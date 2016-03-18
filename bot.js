#!./node_modules/.bin/babel-node

import webdriver from 'selenium-webdriver';
import Promise from 'promise';

import Facebook from './src/game/facebook';
import Agario from './src/game/agario';

const WIDTH = 100,
    HEIGHT = 100,
    ARGVS = ['facebook'];

class Bot {
    constructor() {
        this.settings = {};
        this.parseArgvs();


        this.browser = new webdriver.Builder().usingServer().withCapabilities({
            'browserName': 'chrome',
            'reuse_browser': true
        }).build();

        this.agario = new Agario(this.browser, webdriver);
        this.browser.get('http://agar.io').then(::this.setup);
    }

    parseArgvs() {
        let index;

        process.argv.forEach((arg) => {
            if ((index = ARGVS.indexOf(arg.replace(/-/g, ''))) >= 0) {
                this.settings[ARGVS[index]] = true;
            }
        });
    }

    setup() {
        if (this.settings.facebook) {
            this.facebook = new Facebook(this.browser, webdriver);
            this.facebook.login(this.browser, webdriver)
                .then(() => {
                    this.agario.setup().then(() => {
                        this.browser.manage().window().setSize(WIDTH, HEIGHT)
                            .then(play);
                    })
                });
        } else {
            this.agario.setup().then(() => {
                this.browser.manage().window().setSize(WIDTH, HEIGHT)
                    .then(::this.play);
            })
        }
    }

    play() {
        // Everything is ready, lets play
        //this.browser.close():
    }
}

new Bot();
