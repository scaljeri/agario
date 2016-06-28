import Victor from 'victor';

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

    create() {
        let distance, value, pixel = new Victor(0,0);
        this.pixels = [];

        for (let h = 0; h < this._height; h++) {
            for (let w = 0; w < this._width; w++) {
                pixel.x = w;
                pixel.y = h;
                value = 0;

                this._circles.forEach((circle) => {
                    distance = circle.center.distance(pixel);
                    if (distance <= circle.r + 3) { // +2 to make sure the outline is `0`
                        value = circle.center.distance(pixel) > circle.r ?  170 : 255;
                    }
                });

                this.pixels.push(value);
            }
        }

        return this;
    }

    indexOf(x, y) {
        return y * this._width + x;
    }

    render(pixels) {
        let line = '', h, w;
        pixels = pixels || this.pixels;

        for(h = 0; h < this._height; h+= 1) {
            console.log(line);
            line = '';
            for(w = 0; w < this._width; w++) {
                line += pixels[this.indexOf(w, h)] >= 100 ? '*' : '-';
            }
        }
    }
}
