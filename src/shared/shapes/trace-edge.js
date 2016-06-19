//import {PIXEL_THRESHOLD, MAX_TRACE_LENGTH} from './config';

const PIXEL_THRESHOLD = 100,
    MAX_TRACE_LENGTH = 1000;

export default class TraceEdge {
    constructor(inRGB, outRGB) {
        this.inRGB = inRGB;
        this.outRGB = outRGB;
    }

    setImage(image) {
        this._image = image;
        this._trace = [];

        return this;
    }

    get trace() {
        return this._trace || [];
    }

    start(x, y) {
        var pix, origPix = this.img.get(x, y);

        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i !== j || i !== 0) {
                    pix = this.img.get(x + i, y + j);

                    if (pix !== 0 && y > 0 && (x + i) > 0 && (x + i) < this.img.width - 5) { // Make sure its a new point
                        let index = this.img.indexOf(x + i, y + j);

                        if (origPix === 0 && pix < PIXEL_THRESHOLD) {
                            this.img.pixels[index] = 90;
                            this.img.pixels[index + 1] = 10;
                            this.img.pixels[index + 2] = 90;
                            if (this.traceEdge(x + i, y + j)) {
                                return true;
                            }
                        } else if (origPix !== 0 && pix >= PIXEL_THRESHOLD) {
                            this.img.pixels[index] = this.img.pixels[index + 2] = 0;
                            this.img.pixels[index + 1] = 255;
                            this.trace.push({x: x + i, y: y + j});

                            if (x < 1 || y < 1 || this.img.width < x + 1 || this.img.height < y + 1) {
                                return false;
                            }

                            if (this.trace.length >= MAX_TRACE_LENGTH) {
                                return true;
                            } else {
                                if (this.traceEdge(x + i, y + j)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
