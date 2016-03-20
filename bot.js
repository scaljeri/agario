#!./node_modules/.bin/babel-node

import webdriver from 'selenium-webdriver';
import Promise from 'promise';

import Page from './src/game/page';
import Facebook from './src/game/facebook';
import Agario from './src/game/agario';

const WIDTH = 700,
    HEIGHT = 700,
    ARGVS = ['facebook', 'snapshot'];

class Bot {
    constructor() {
        this.settings = {};
        this.parseArgvs();


        this.browser = new webdriver.Builder().usingServer().withCapabilities({
            'browserName': 'chrome',
            'reuse_browser': false
        }).build();

        this.page = new Page(webdriver, this.browser, {
            isGuest: !this.settings.facebook
        });

        this.agario = new Agario(this.page);
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
        return new Promise((resolve) => {
            if (this.settings.facebook) {
                this.facebook = new Facebook(this.page);
                this.facebook.login()
                    .then(resolve)
            } else {
                resolve();
            }
        })
            .then(::this.agario.setup)
            .then(() => {
                return this.browser.manage().window().setSize(WIDTH, HEIGHT)
            })
            .then(::this.page.injectJS)
            .then(::this.play);
    }

    play() {
        this.page.isSettingsVisible()
            .then(() => {
                this.agario.play();
                this.monitorGameOver();
            });
    }

    monitorGameOver() {
        this.page.isSettingsVisible()
            .then(::this.browser.close,
                ::this.monitorGameOver)
    }
}

new Bot();
