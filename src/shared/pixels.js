import isNumber from './utils';

/**
 * Pixels live in 2D (x and y), but are represented in a 1D array, using RGBA values
 *
 * @example
 *     100
 *     0
 *     233
 *     255
 *
 * In 1D: [100, 0, 233, 255, 0, 100, 100, 255, ....]
 *
 * To reach the second pixel 4 pixels need to be skipped, which is known as the `STRIDE`.
 * The default stride is 4.
 */
export default class Pixels {
    /**
     * Accepts an ndarray or its separate values (same as #set)
     *
     * @param {Array | ndarray} pixels - List of pixels or ndarray
     * @param {Number} height - Height of the image
     * @param {Number} width - Width of the image
     * @param {Number} stride - Stride of the pixel array
     */
    constructor(pixels, height, width, stride) {
        this.set(pixels, height, width, stride);
    }

    /**
     * Access the RGBA array by `x` and `y`
     *
     * @param {Numer} x
     * @param {Number} y
     * @returns {Number}
     */
    get(x, y) {
        let step = (this.width * y + x) << this._blShift;
        return this._pixels[step];
    }

    /**
     * Returns an ndarray object (https://github.com/scijs/ndarray). For a stride of 4
     * the original pixels (RGBA) are returned. For a stride of 1 only the `R` values are
     * returned.
     *
     * @param {Number} stride - Supported values are 1 and 4
     * @returns {{data: *, shape: number[], stride: number[], offset: number}}
     */
    ndarray(stride) {
        stride = stride || this.stride;

        return {
            data: stride === 4 ? this._pixels : this._pixels.reduce((newArr, value, index) => {
                if (index % stride === 0) {
                    newArr.push(value);
                }

                return newArr;
            }, []),
            shape: [this.width, this.height, stride],
            stride: [stride, stride * this.width, 1],
            offset: 0
        };
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    get stride() {
        return this._stride;
    }

    /**
     * The pixel array should be a 1 dimensional array with RGBA values (=stride of 4)
     *
     * @param pixels - Canvas pixel array (stride of 4)
     * @param {Number} height - height of the canvas
     * @param {Number} width - width of the canvas
     * @returns {Object} this
     */
    set(pixels, height, width, stride) {
        if (pixels.data) {
            this._pixels = pixels.data;
            this._width  = pixels.shape[0];
            this._height = pixels.shape[1];
            this._stride = pixels.stride[0];
        }  else {
            this._width  = width;
            this._height = height;
            this._pixels = pixels;
            this._stride = stride || pixels.length / (width * height); // Expect 1, 2 or 4
        }

        this._blShift = Math.floor(this._stride / 2);                  //  Bitwise left shift value;

        return this;
    }
}

