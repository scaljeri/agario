import Pixels from './pixels';
import Engine from './engine';

export default class Game {
    constructor(page, options = {}) {
        this.page = page;
        this.snapshotDir = options.snapshotDir;
        this.options = options;

        if (options.snapshotDir) {
            this.pixels = new Pixels(options.snapshotDir)
        }

        Engine.getInstance()
            .on('play', ::this.play);
    }

    play() {
        console.log('play');
        if (this.pixels) {
            return this.page.takeSnapshot(); // TODO: Save pixels
        } else {
            return this.page.getMouseCoords().then((coords) => {
                return this.page.moveMouse(coords); // TODO: Move mouse
            });
        }

    }
}
