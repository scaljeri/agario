import Promise from 'promise';

export default class Snapshots {
    constructor(gamePage, heartbeat, image) {
        this._gamePage = gamePage;
        this._heartbeat = heartbeat;
        this._image = image;

        heartbeat.fps = 1; // Pull screenshots once per second
        heartbeat.on('snaptshots', ::this.getSnapshots);

        // TODO: Setup heartbeat
    }

    start() {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;

            this._heartbeat.start();
        });
    }

    getSnapshots() {
        console.log('before');
        return this._gamePage.remote('getSnapshots()')
            .then((data) => {
                data.forEach(screenshot => {
                    this._image.set(screenshot).save();
                });
            });
    }

    takeSnapshot() {

    }
}
