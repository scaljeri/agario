export default class Screen {
    constructor(pixelFactory) {
        this._pixelFactory = pixelFactory;

        this._buffer = [];

        document.body.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 84) { // t === 84
                this.takeScreenshot();
            }
        });
    }


    calibrate() {
        this._canvas = document.querySelector('#canvas');
        this._ctx = this._canvas.getContext('2d');

        this._width = this._canvas.width;
        this._height = this._canvas.height;

        return this;
    }

    flush() {
        let buffer = this._buffer;
        this._buffer = [];

        return buffer;
    }

    takeScreenshot(stride = 1) {
        if (!this._ctx) {
            this.calibrate();
        }

        let data = this._ctx.getImageData(0, 0, this._width, this._height).data,
            buffer = this._pixelFactory.getInstance(data, this._height, this._width, 4)
                .ndarray(stride);

        this._buffer.push(buffer);

        return buffer;
    }
}
