import isNumber from './utils';

/**
 * A Pixel consists of 4 values: RGBA
 * @example
 *     100
 *     0
 *     233
 *     255
 *
 * For performance it is possible to only work with the `R` value and thus, remove
 * the others. This is controlled with the `stride`. Initially, the pixels provided
 * by the canvas have a stride of 4, but it is recommended to set it to 1.
 *
 * Internally the array is a [ndarray]{@link http://docs.scipy.org/doc/numpy/reference/arrays.ndarray.html}
 */
export default class Pixels {
    /**
     * @constructor
     * By default it is possible to go from a stride of 4 to 2 or 1, but you cannot go from 1 to 4,
     * because the `GBA` pixels are gone. However, with `cachePixels` turned on, the original
     * pixels are kept in memory and the stride can go back and forth
     *
     * @param {Boolean=false} cachePixels - Keep original pixels
     */
    constructor(cachePixels) {
        /**
         * @private
         */
        this.cache = cachePixels;
    }

    get(x, y) {

    }

    all() {
        let data = this.data;

        if (this._stride !== this._data.stride[0]) {

            data = this.data.reduce((newData, value, index) => {
                if (index % 4 === 0) {
                    newArr.push(value);
                }

                return newArr;
            }, []);
        }
    }

    get height() {
        return this._height;
    }

    get width() {
        return this._width;
    }

    get offset() {
        return this._offset;
    }

    get stride() {
        return this._stride;
    }

    set stride(stride) {
        if (isNumber(stride)) {
            if (stride > 4 || stride <= 0) {
                throw Error(`Stride should be between 1 and 4! (received: ${stride}`);
            } else if (this._data) {
                if (this._stride > this._data.stride[0] && !this._cached) {
                    throw Error(`Cannot increase stride to ${stride} (Current stride is ${this._stride})`)
                }
            }
        } else {
            throw Error(`Stride should be a number! (received: ${stride})`);
        }

        this._stride = stride;
    }

    /**
     * The pixel array should be a 1 dimensional array with RGBA values (stride of 4)
     *
     * @param pixels - Canvas pixel array
     * @param {Number} height - height of the canvas
     * @param {Number} width - width of the canvas
     * @returns {{data: (*|data), shape: *[], stride: number[], offset: number}|*}
     */
    setPixels(pixels, height, width) {
        if (!Array.isArray(pixels)) {
            throw Error('Pixels should be an array');
        }

        if (pixels.length > 0 && pixels.length % 4 === 0) {
            throw Error(`Pixel array has incorrect length (${pixels.length}`);
        }

        if (!isNumber(width) || !isNumber(height)) {
            throw(`Height and width should be numbers (received: height=${height}, width=${width}`);
        }

        this._width = width;
        this._height = height;
        this._data = {
            data: pixels,
            shape: [width, height, 4],
            stride: [4,  4 * this.width, 1],
            offset: 0
        };
    }

}

