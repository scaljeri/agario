export default class BaseAnalyser {
    constructor(RGBA) {
        this._RGBA = RGBA || [255,0,255];
    }

    get ARGBA() {
        return this._rgba;
    }

    get image() {
        return this._image;
    }

    get trace() {
        return this._trace;
    }

    set(image) {
        this._image = image;
        this._trace = [];

        return this;
    }

    paintTrace(rgba) {
        let color = rgba || this._RGBA;

        this._trace.forEach((index) => {
            this._image.change(index, color);
        });
    }
}
