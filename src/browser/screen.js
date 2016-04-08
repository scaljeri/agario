import Pixels from '../shared/pixels';

export default class Screen {
    calibrate() {
        if (!this._ctx) {
            this._canvas = document.querySelector('#canvas');
            this._ctx = this._canvas.getContext('2d');
        }

        this.width = this._canvas.width;
        this.height = this._cnavas.height;
    }

    takeScreenshot(stride = 1) {
        if (!this.ctx) {
            this.calibrate();
        }

        let data = this.ctx.getImageData(0, 0, this.width, this.height).data;

        return new Pixels(data, this.height, this.width, 4)
            .ndarray(stride);
    }
}
