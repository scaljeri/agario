import Pixels from './pixels';

export default class Agario {
    constructor(page, snapshotsDir) {
        this.page = page;

        if (snapshotsDir) {
            this.pixels = new Pixels(snapshotsDir)
        }
    }

    setup() {
        return this.page.gotoSettings()
            .then(::this.page.setSkins)
            .then(::this.page.setColors)
            .then(::this.page.setTheme)
            .then(::this.page.setNames)
            .then(::this.page.setMass)
            .then(::this.page.setStats)
    }

    play() {
        this.page.start().then(() => {

            if (this.pixels) {
                this.page.takeSnapshot()
                    .then((pixels) => {
                        this.pixels.save(pixels);
                    });

            } else {
                this.page.getMouseCoords().then((coords) => {
                    this.page.moveMouse(coords);
                });
            }
        });
    }
}
