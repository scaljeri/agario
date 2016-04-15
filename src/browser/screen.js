export default class Screen {
    constructor(pixelFactory) {
        this._pixelFactory = pixelFactory;
    }

    calibrate() {
        if (!this._ctx) {
            this._canvas = document.querySelector('#canvas');
            this._ctx = this._canvas.getContext('2d');
        }

        this._width = this._canvas.width;
        this._height = this._canvas.height;

        return this;
    }

    takeScreenshot(stride = 1) {
        if (!this._ctx) {
            this.calibrate();
        }

        let data = this._ctx.getImageData(0, 0, this._width, this._height).data;

        return this._pixelFactory.getInstance(data, this._height, this._width, 4)
            .ndarray(stride);
    }
}
