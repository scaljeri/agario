#!./node_modules/.bin/babel-node

import Promise from 'promise';

import MainPage from './src/backend/pages/main-page';
import SettingsPage from './src/backend/pages/settings-page';
import Facebook from './src/backend/facebook';

const WIDTH = 700,
    HEIGHT = 700,
    ARGVS = ['facebook', 'snapshots', 'fps'],
    ARGVS_DEFAULT = {
        snapshots: './snapshots',
        fps: 10
    };

class Driver {
    constructor() {
        this.parseArgvs();

        this.page = new MainPage();
        this.settingsPage = new SettingsPage();

        this.setup().then(() => {
                // Lets play!!!
            })
            .then(::this.page.close);
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
            .then(::this.settingsPage.lowResolution)
            .then(() => this.page.injectJS());
    }

    drive() {
        Engine.getInstance().start();
    }
}

new Driver();
