//import {PIXEL_THRESHOLD, MAX_TRACE_LENGTH} from './config';

const PIXEL_THRESHOLD = 100,
    MAX_TRACE_LENGTH = 1000;

export default class TraceEdge {
    constructor(RGBA) {
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
        let w, h, index;

        for (w = -1; w <= 1; w++) {
            for (h = -1; h <= 1; h++) {
                if (w === 0 && h !== 0) {
                    index = this._image.indexOf(x + w, y + h);

                    if (this.usePixel(index, !isInside)) {
                        this._trace.push(index);

                        if (this._trace.length === MAX_TRACE_LENGTH || this.start(x + w, y + h, !isInside)) {
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

    usePixel(index, isInside) {
        let isTraced = this._image.getMetadataByIndex(index, 'traced'),
            pixelVal = this._image.pixels[index],
            retVal = false;

        if (!isTraced) {                        // new pixel?
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

    paintTrace(rgba) {
        this._trace.forEach((index) => {
            this._image.change(index, rgba || this._RGBA);
        });
    }
}
