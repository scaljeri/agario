export default class Screen {
    constructor() {
        this._stride = 4;
    }

    get stride() {
        return this._stride
    }

    set stride(value) {
        this._stride = value;
    }
    calibrate() {
        this.canvas = document.querySelector('#canvas');
        this.width = canvas.width;
        this.height = cnavas.height;

        this.ctx = this.canvas.getContext('2d');
    }

    takeScreenshot() {
        if (!this.ctx) {
            this.calibrate();
        }

        this.data = this.ctx.getImageData(0, 0, this.width, this.height).data;
    }

    pixel(x, y) {

    }

    get pixels() {
        if (!this._data) {
            let data = this.data;

            if (this._stride) {
                data = this.data.reduce((newData, value, index) => {
                    if (index % 4 === 0) {
                        newArr.push(value);
                    }

                    return newArr;
                }, []);
            }

            this._data = {
                data: data,
                shape: [this.width, this.height, this.stride],
                stride: [this.stride, this.stride * this.width, 1],
                offset: 0
            };
        }

        return this._data;

    }
}
