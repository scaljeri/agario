//import {PIXEL_THRESHOLD, MAX_TRACE_LENGTH} from './config';
import BaseAnalyser from './base-analyser';

const PIXEL_THRESHOLD = 200,
    MAX_TRACE_LENGTH = 70,
    MAX_STEP_DEPTH = 8,
    EDGE_DISTANCE = 5;

export default class TraceEdge extends BaseAnalyser {
    constructor(RGBA) {
        super(RGBA);
    }

    start(x, y) {
        this.lookAround(x, y);
    }

    lookAround(x, y, isInside = true) {
        this.moveHorizontal(x, y, -1, isInside);        // Move left

        if (this._trace.length < MAX_TRACE_LENGTH) {
            this.moveHorizontal(x, y, 1, isInside);     // Move right
        }

        if (this._trace.length < MAX_TRACE_LENGTH) {
            let lastPixel = this._trace.slice(-1);
            this.lookAround
        }
    }

    getPixelIfInteresting(x, y, isInside) {
        let pixel = this._image.get(x, y);

        if((isInside && pixel < PIXEL_THRESHOLD || !isInside && pixel >= PIXEL_THRESHOLD) &&
            this.isWithinBounds(x, y)) {
            return pixel;
        }
    }

    moveHorizontal(x, y, dir, isInside) {
        let pixel, nextX, nextY;

        for (let step = 0; step < MAX_STEP_DEPTH; step++) {
            x += dir;
            pixel = this.getPixelIfInteresting(x, y, isInside);

            if (pixel !== undefined && !this._image.getMetadata(x, y, 'trace')) {
                [nextX, nextY] = this.moveVertical(x, y, -1, !isInside);

                if (!nextX) {
                    [nextX, nextY] = this.moveVertical(x, y, 1, !isInside);
                }

                if (nextX && this._trace.length < MAX_TRACE_LENGTH) {
                    this._image.updateMetadata(nextX, nextY, 'trace', true);
                    this._trace.push(this._image.indexOf(nextX, nextY));

                    this.lookAround(nextX, nextY, isInside);
                }
            }
        }
    }

    moveVertical(x, y, dir, isInside) {
        let pixel;

        for (let step = 0; step < MAX_STEP_DEPTH; step++) {
            y += dir;
            pixel = this._image.get(x, y);

            // Need a pixel which is inside
            if (this._image.getMetadata(x, y, 'trace')) {
                return [];
            } else if (this.getPixelIfInteresting(x, y, isInside)) {
                return [x, y];
            }
        }

        return [];
    }

    isWithinBounds(x, y) {
        return x > EDGE_DISTANCE && x < this._image.width - EDGE_DISTANCE &&
            y > EDGE_DISTANCE && y < this._image.height - EDGE_DISTANCE;
    }
}
