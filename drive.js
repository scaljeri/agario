#!./node_modules/.bin/babel-node

import Promise from 'promise';
import DI from 'javascript-dependency-injection';

import MainPage from './src/backend/pages/main-page';
import SettingsPage from './src/backend/pages/settings-page';
import Facebook from './src/backend/facebook';
import Snapshots from './src/backend/snapshots';

const WIDTH = 700,
    HEIGHT = 700,
    ARGVS = ['facebook', 'snapshots', 'fps'],
    ARGVS_DEFAULT = {
        snapshots: './snapshots',
        fps: 10
    },
    di = new DI();

class Driver {
    constructor() {
        this.parseArgvs();

        di.register('facebook', Facebook, [], {singletomn: true});
        di.register('mainPage', MainPage, [], {singleton: true});
        di.register('settingsPage', SettingsPage, [], {singleton: true});
        di.register('snapshots', Snapshots, [], {singletomn: true});

        this.setup().then(() => {
                if (this.settings.snapshots) {
                    return di.getInstance('snapshots').start();
                } else {
                    // Lets play!!!
                }
            })
            .then(() => di.getInstance('mainPage').close());
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
        let settingsPage = di.getInstance('settingsPage'),
            mainPage = di.getInstance('mainPage');

        return mainPage.load()
            .then(() => {
                if (this.settings.facebook) {
                    return di.getInstance('facebook').login();
                } else {
                    mainPage.resolve();
                }
            })
            .then(::settingsPage.checkCheckboxes)
            .then(::settingsPage.lowResolution)
            .then(() => mainPage.injectJS());
    }

    drive() {
        Engine.getInstance().start();
    }
}

new Driver();
