import Promise from 'promise';
import Heartbeat from '../shared/heartbeat';

export default class Snapshots {
    constructor(dir = './snapshots') {
        this._dir = dir;
    }

    start() {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }
}
