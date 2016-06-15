import fs from 'fs';
import pngjs from 'pngjs';

import DI from 'javascript-dependency-injection';
import Image from './image';

let di = new DI();

export default class Test {
    constructor(settings) {
        this._image = new Image(fs, pngjs.PNG);
        this._loadingPromise = this._image.load(settings.dry);
    }

    start() {
        return this._loadingPromise
            .then(() => {
            });
    }
}
