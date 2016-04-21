export default class Screen {
    constructor(pixelFactory) {
        this._pixelFactory = pixelFactory;
    }

    setup() {
        this._buffer = [];
        this._canvas = document.querySelector('#canvas');
        this._ctx = this._canvas.getContext('2d');

        this._canvas.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 84) { // t === 84
                this.takeScreenshot();
            }
        });

        return this.calibrate();
    }

    calibrate() {
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
        //alert('take screenshot');
        let data = this._ctx.getImageData(0, 0, this._width, this._height).data,
            buffer = this._pixelFactory.getInstance(data, this._height, this._width, 4)
                .ndarray(stride);

        this._buffer.push(buffer);

        return buffer;
    }
}
