import fs from 'fs';
import pngjs from 'pngjs';
import savePixels from 'save-pixels';
import ndarray from 'ndarray';
import numeric from 'numeric';
import Victor from 'victor';

import Cell from '../shared/shapes/cell';
import Circle from '../shared/shapes/circle';
import DI from 'javascript-dependency-injection';
import Food from '../shared/shapes/food';
import Image from './image';
import PlayGround from '../shared/play-ground';
import Shape from '../shared/shape';
import TraceEdge from '../shared/shapes/trace-edge';
import Virus from '../shared/shapes/virus';

let di = new DI();

export default class Test {
    constructor(settings) {
        di.register('$shape', Shape, ['$traceEdge', 'circleFactory', 'cellFactory', 'foodFactory', 'virusFactory', false], {singleton: true});
        di.register('$traceedge', TraceEdge, {singleton: true});
        di.register('$cell', Cell);
        di.register('$circle', Circle, ['$victorFactory', numeric]);
        di.register('$food', Food);
        di.register('$image', Image, [fs, pngjs.PNG, savePixels, ndarray]);
        di.register('$playground', PlayGround, ['$shape']);
        di.register('$vistor', Victor);
        di.register('$virus', Virus);

        this._image = di.getInstance('$image');
        this._loadingPromise = this._image.load(settings.dry);
    }

    start() {
        return this._loadingPromise
            .then(() => {
                di.getInstance('$playground', this._image);
            });
    }
}
