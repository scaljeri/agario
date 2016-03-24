#!./node_modules/.bin/babel-node

import Promise from 'promise';

import MainPage from './src/game/pages/main-page';
import SettingsPage from './src/game/pages/settings-page';
import Facebook from './src/game/facebook';

const WIDTH = 700,
    HEIGHT = 700,
    ARGVS = ['facebook', 'snapshots', 'fps'],
    ARGVS_DEFAULT = {
        snapshots: './snapshots',
        fps: 10
    };

class Bot {
    constructor() {
        this.parseArgvs();

        this.page = new MainPage();
        this.settingsPage = new SettingsPage();

        this.setup().then(() => {
                // Lets play!!!
            })
            .then(::this.page.close);

        //this.page = new Page(webdriver, browser, {isGuest: !this.settings.facebook});
        //this.agario = new Agario(this.page, {snapshotDir: this.settings.snapshots});
        //
        //this.page.load().then(::this.setup);
    }

    parseArgvs() {
        this.settings = {};

        process.argv.forEach((arg) => {
            let option = arg.replace(/-/g, '').split('='),
                index = ARGVS.indexOf(option[0]);

            if (index >= 0) {
                this.settings[ARGVS[index]] = option[1] || ARGVS_DEFAULT[ARGVS[index]] || true;
            }
        });
    }

    setup() {
        return this.page.load()
            .then(() => {
                if (this.settings.facebook) {
                    return new Facebook().login();
                } else {
                    this.page.webdriver.promise.when();
                }
            })
            .then(::this.settingsPage.checkCheckboxes)
            .then(::this.settingsPage.lowResolution);
        //.then(::this.page.injectJS)
        //.then(::this.begin);
    }

    begin() {
        this.counter = 0;
        Engine.getInstance().start();
    }

    /*
     checkState() {
     console.log('check state');
     return new Promise((resolve, reject) => {
     this.counter++;

     if (this.counter > 9) {
     this.page.isSettingsVisible().then((state) => {
     if (state === true) {
     reject();
     } else {
     resolve();
     }
     })
     } else {
     resolve();
     }
     });
     }

     monitorGameOver() {
     let loopCount = 0;

     console.log('loopin');
     this.page.isSettingsVisible()
     .then(() => {
     console.log('af');
     if (++loopCount === this.settings.loop) {
     this.browser.close();
     } else {
     this.play(); // Play again
     }
     }, () => {
     console.log('still playiong');
     this.monitorGameOver();
     });
     }
     */
}

new Bot();
