import Victor from 'victor';

import {PIXEL_THRESHOLD} from '../../src/shared/config';
import Pixels from '../../src/shared/pixels';

export default class ImageGen {
    constructor(width = 100, height = 100) {
        this._circles = [];
        this._height = height;
        this._width = width;
    }

    defineCircle(cx = 40, cy = 40, r = 20) {
        let circle = {center: new Victor(cx, cy), r};

        this._circles.push(circle);

        return circle;
    }

    getTop(index = 0) {
        let v = this._circles[index];

        return [v.center.x, v.center.y - v.r];
    }

    getBottom(index = 0) {
        let v = this._circles[index];

        return [v.center.x, v.center.y + v.r];
    }

    getOffTop(index = 0) {
        let v = this._circles[index];

        return [v.center.x, v.center.y - v.r];

    }

    create() {
        let distance, value, pixel = new Victor(0,0),
            pixels = [];

        for (let h = 0; h < this._height; h++) {
            for (let w = 0; w < this._width; w++) {
                pixel.x = w;
                pixel.y = h;
                value = 0;

                this._circles.forEach((circle) => {
                    distance = circle.center.distance(pixel);
                    if (distance <= circle.r + 3) { // +2 to make sure the outline is `0`
                        value = circle.center.distance(pixel) > circle.r ?  170 : PIXEL_THRESHOLD;
                    }
                });

                pixels.push(value);
            }
        }

        this.pixels = new Pixels(pixels, this._height, this._width, 1);

        return this.pixels;
    }

    render(pixels, trace) {
        let pixel, line = '', h, w;
        pixels = pixels || this.pixels.list;

        trace.forEach((index) => {
            pixels[index] = -1;
        });

        for(h = 0; h < this._height; h+= 1) {
            console.log(line);
            line = '';
            for(w = 0; w < this._width; w++) {
                pixel = pixels[this.pixels.indexOf(w, h)];
                line += pixel === -1 ? 't' : (pixel >= PIXEL_THRESHOLD ? '*' : '-');
            }
        }
    }
}
