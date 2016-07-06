import {PIXEL_THRESHOLD} from './config';

export default class PlayGround {
    constructor(shape, image) {
        this._shape = shape;
        this._shapes = [];

        if (image) {
            this.analyse(image);
        }
    }

    analyse(image) {
        let pixel,
            item,
            inRegion = false,
            iterator = image.iterator();

        item = iterator.next();

        while(!item.done) {
            pixel = item.value;

            if (pixel.value >= PIXEL_THRESHOLD) {
                if (!inRegion) {
                    inRegion = true;

                    this._shapes.push(this._shape.create(pixel.x, pixel.y, image));
                }
            } else {
                inRegion = false;
            }

            item = iterator.next();
        }
    }
}
