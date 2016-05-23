import Promise from 'promise';

export default class Snapshots {
    constructor(gamePage, image) {
        this._gamePage = gamePage;
        this._image = image;
    }

    get promise() {
        // TODO: Detect browser close
        return new Promise(() => {});
    }

    getSnapshots() {
        return this._gamePage.remote('getSnapshots')
            .then((data) => {
                data.forEach(screenshot => {
                    this._image
                        .set(screenshot)
                        .save();
                });
            });
    }

    takeSnapshot() {

    }
}
