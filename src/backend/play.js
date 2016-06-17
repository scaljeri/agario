import fs from 'fs';
import ndarray from 'ndarray';
import savePixels from 'save-pixels';
import DI from 'javascript-dependency-injection';


// Backend
import Facebook from './facebook';
import Image from './image';
import Snapshots from './snapshots';
import MainPage from './pages/main-page';
import GamePage from './pages/game-page';
import SettingsPage from './pages/settings-page';

// Shared
import Heartbeat from '../shared/heartbeat';

const WIDTH = 700,
    HEIGHT = 700;

export default class Play {
    constructor(settings) {
        let di = new DI();

        this.settings = settings;

        // Setup dependency injection
        di.register('$facebook', Facebook, [], {singleton: true});
        di.register('$heartbeat', Heartbeat, [], {singleton: true});
        di.register('$image', Image, [fs, null, savePixels, ndarray, settings.snapshots], {singleton: true});
        di.register('$mainPage', MainPage, [], {singleton: true});
        di.register('$gamePage', GamePage, [settings], {singleton: true});
        di.register('$settingsPage', SettingsPage, [], {singleton: true});
        di.register('$snapshots', Snapshots, ['$gamePage', '$image'], {singleton: true});

        this._di = di;
    }

    start() {
        let di = this._di;

        return this.setup()
            .then(() => {
                if (this.settings.snapshots) { // Human play with snapshots (char `t` to take snapshot)
                    return di.getInstance('$gamePage').start()
                        .then(() => {
                            let heartbeat = di.getInstance('$heartbeat')
                                .on('snapshot', ::(di.getInstance('$snapshots')).getSnapshots)
                                .start(1);

                            let promise = di.getInstance('$snapshots').promise;
                            di.getInstance('$heartbeat').start();

                            return promise;
                        });
                } else { // Bot play
                    return di.getInstance('$gamePage').start();
                }
            })
            .then(() => di.getInstance('$mainPage').close());
    }

    setup() {
        let di = this._di,
            settingsPage = di.getInstance('$settingsPage'),
            mainPage = di.getInstance('$mainPage');

        return mainPage.load()
            .then(::mainPage.cleanup)
            .then(() => {
                if (this.settings.facebook) {
                    return di.getInstance('$facebook').login();
                } else {
                    mainPage.resolve();
                }
            })
            .then(::settingsPage.checkCheckboxes)
            .then(::settingsPage.lowResolution)
            .then(() => mainPage.injectJS());
    }
}
