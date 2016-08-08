import {PIXEL_THRESHOLD, MAX_TRACE_LENGTH} from '../../config';
import BaseAnalyser from './base-analyser';

const MAX_STEP_DEPTH = 8,
    EDGE_DISTANCE = 5;

export default class TraceEdge extends BaseAnalyser {
    static MOVE_LEFT = -1;
    static MOVE_UP = -1;
    static MOVE_RIGHT = 1;
    static MOVE_DOWN = 1;

    constructor(RGBA, traceLength) {
        super(RGBA, traceLength);
    }

    start(x, y) {
        this.lookAround(x, y);
    }

    lookAround(x, y, isInside = true) {
        this.moveHorizontal(x, y, TraceEdge.MOVE_LEFT, isInside);

        if (this._trace.length < MAX_TRACE_LENGTH) {
            this.moveHorizontal(x, y, TraceEdge.MOVE_RIGHT, isInside);     // Move right
        }
    }

    getPixelIfInteresting(x, y, isInside) {
        let pixel = this._image.get(x, y);

        if ((isInside && pixel < PIXEL_THRESHOLD || !isInside && pixel >= PIXEL_THRESHOLD) &&
            this.isWithinBounds(x, y)) {
            return pixel;
        }
    }


    moveHorizontal(x, y, dir, isInside) {
        let pixel, nextX, nextY;

        while (!pixel && this.isWithinBounds(x, y)) {
            x += dir;
            pixel = this.getPixelIfInteresting(x, y, isInside);

            if (pixel !== undefined && !this._image.getMetadata(x, y, 'trace')) {
                [nextX, nextY] = this.moveVertical(x, y, TraceEdge.MOVE_UP, !isInside);

                if (!nextX) {
                    [nextX, nextY] = this.moveVertical(x, y, TraceEdge.MOVE_DOWN, !isInside);
                }

                if (nextX && this._trace.length < MAX_TRACE_LENGTH) {
                    this._image.updateMetadata(nextX, nextY, 'trace', true);
                    this._trace.push(this._image.indexOf(nextX, nextY));

                    this.moveHorizontal(nextX, nextY, dir, isInside);
                }
            } else if (this._trace.length < MAX_TRACE_LENGTH) {
                this._trace.push(this._image.indexOf(x, y));
            } else {
                return;
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
