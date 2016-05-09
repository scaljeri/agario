import Promise from 'promise';

export default class Snapshots {
    constructor(gamePage, heartbeat, image) {
        this._gamePage = gamePage;
        this._heartbeat = heartbeat;
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
                    this._image.set(screenshot).save();
                });
            });
    }

    takeSnapshot() {

    }
}
