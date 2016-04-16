import Promise from 'promise';

export default class Snapshots {
    constructor(heartbeat, image, dir = './snapshots') {
        this._dir = dir;

        // TODO: Setup heartbeat
    }

    start() {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
}
