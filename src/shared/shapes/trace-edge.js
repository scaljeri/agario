//import {PIXEL_THRESHOLD, MAX_TRACE_LENGTH} from './config';

const PIXEL_THRESHOLD = 100,
    MAX_TRACE_LENGTH = 1000;

export default class TraceEdge {
    constructor(inRGB, outRGB) {
        this._inRGB = inRGB;
        this._outRGB = outRGB;

        // The 'A' is used to determine if a pixels has already been traced
        if (this._inRGB) {
            this._inRGB.push(254);
        }

        if (this._outRGB) {
            this._outRGB.push(254);
        }
    }

    setImage(image) {
        this._image = image;
        this._trace = [];

        return this;
    }

    get trace() {
        return this._trace || [];
    }

    start(x, y, isInside = true) {
        let w, h, index;

        for (w = -1; w <= 1; w++) {
            for (h = -1; h <= 1; h++) {
                if (w === 0 && h !== 0) {
                    index = this._image.indexOf(x + w, y + h);

                    if (this._image.pixels[index + 3] === 255) { // new pixel
                        if (isInside) {
                            if (pixel < PIXEL_THRESHOLD) {
                                if (this._outRGB) {
                                    this._image.change(x + w, y + h, this._outRGB);
                                }
                                if (this.start(x + w, y + h, false)) {
                                    return true;
                                }

                            }
                        } else if (pixel >= PIXEL_THRESHOLD) {
                            this._trace.push({x: x + w, y: y + h});
                            
                            if (this._inRGB) {
                                this._image.change(x + w, y + h, this._inRGB);
                            }
                            if (this.start(x + w, y + h, true)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }

        /*
                if (i !== j || i !== 0) {
                    pix = this.img.get(x + i, y + j);

                    if (pix !== 0 && y > 0 && (x + i) > 0 && (x + i) < this.img.width - 5) { // Make sure its a new point
                        let index = this.img.indexOf(x + i, y + j);

                        if (origPix === 0 && pix < PIXEL_THRESHOLD) {
                            this._image.change(x + i, y + j, this._outRGB)

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
                */
    }
}
