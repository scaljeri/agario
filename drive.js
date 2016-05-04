#!./node_modules/.bin/babel-node

import Promise from 'promise';
import DI from 'javascript-dependency-injection';

// Backend
import Facebook from './src/backend/facebook';
import Image from './src/backend/image';
import MainPage from './src/backend/pages/main-page';
import GamePage from './src/backend/pages/game-page';
import Snapshots from './src/backend/snapshots';
import SettingsPage from './src/backend/pages/settings-page';

// Shared
import Heartbeat from './src/shared/heartbeat';

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

        di.register('facebook', Facebook, [], {singleton: true});
        di.register('heartbeat', Heartbeat, [], {singleton: true});
        di.register('image', Image, [this.settings.snapshots], {singleton: true});
        di.register('mainPage', MainPage, [], {singleton: true});
        di.register('gamePage', GamePage, [this.settings], {singleton: true});
        di.register('settingsPage', SettingsPage, [], {singleton: true});
        di.register('snapshots', Snapshots, ['gamePage', 'heartbeat', 'image'], {singleton: true});

        this.setup().then(() => {
                if (this.settings.snapshots) { // Human play with snapshots (char `t` to take snapshot)
                    return di.getInstance('gamePage').start()
                        .then(() => {
                            di.getInstance('snapshots');
                            //di.getInstance('hearbeat')
                        });
                } else { // Bot play
                    return di.getInstance('gamePage').start();
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
