//import {PIXEL_THRESHOLD, MAX_TRACE_LENGTH} from './config';

const PIXEL_THRESHOLD = 200,
    MAX_TRACE_LENGTH = 1000;

export default class TraceEdge {
    constructor(RGBA) {
        console.log("OK");
        console.log(RGBA);
        this._RGBA = RGBA;
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
        let w, h, px, py,  index;

        for (w = -1; w <= 1; w++) {
            for (h = -1; h <= 1; h++) {
                if (w === 0 && h !== 0) {
                    px = x + w;
                    py = y + h;
                    index = this._image.indexOf(px, py);

                    if (this.usePixel(px, py, index, !isInside)) {
                        this._trace.push([x + w, y + h, index]);

                        if (this._trace.length === MAX_TRACE_LENGTH || this.start(x + w, y + h, !isInside)) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    usePixel(x, y, index, isInside) {
        let isTraced = this._image.getMetadata(index, 'traced'),
            pixelVal = this._image.pixels[index],
            retVal = false;

        if (!isTraced && this.isOnTrack(x, y)) {                        // new pixel?
            if (pixelVal < PIXEL_THRESHOLD) {   // outside pixel
                if (isInside) {                 // is it needed?
                    retVal = true;
                }
            } else if (!isInside) {             // inside pixel needed?
                retVal = true;
            }
        }

        if (retVal) {
            this._image.updateMetadataByIndex(index, 'traced', true);
        }

        return retVal;
    }

    isOnTrach(x, y) {
        // TODO: Check if tracing is still on the right track
        // use this._trace + x and y
        return true;
    }
    paintTrace(rgba) {
        this._trace.forEach((index) => {
            this._image.change(index, rgba || this._RGBA);
        });
    }
}
