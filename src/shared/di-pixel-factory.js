export default class DiPixelFactory {
    constructor(di) {
        this.di = di;
    }

    getInstance(data, height, width, stride) {
        return this.di.getInstance('pixels', [data, height, width, stride]);
    }
}
