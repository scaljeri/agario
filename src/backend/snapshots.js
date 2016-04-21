import Promise from 'promise';

export default class Snapshots {
    constructor(heartbeat, image, dir = './snapshots') {
        this._dir = dir;
        this._heartbeat = heartbeat;
        this._image = image;

        heartbeat.fps = 1000; // Pull screenshots every second
        heartbeat.on('snaptshots', ::this.getSnapshots);

        // TODO: Setup heartbeat
    }

    start() {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;

            this.count = 0;
            this._heartbeat.start();
        });
    }

    getSnapshots() {
        console.log("pull screenshots " + (++this.count));
    }

    takeSnapshot() {

    }
}
