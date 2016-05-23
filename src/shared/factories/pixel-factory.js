export default class PixelFactory {
    constructor(di) {
        this._di = di;
    }

    getInstance(data, height, width, stride) {
        return this._di.getInstance('pixels', [data, height, width, stride]);
    }
}
