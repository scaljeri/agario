import DI from 'javascript-dependency-injection';

import Pixels from '../shared/pixels';
import Heartbeat from '../shared/heartbeat';
import PixelFactory from '../shared/factories/pixel-factory';
import ShapeFactory from '../shared/factories/shape-factory';
import Virus from '../shared/shapes/virus';
import Cell from '../shared/shapes/cell';
import Food from '../shared/shapes/food';
import PixelTransform from '../shared/pixel-transform';

import Play from './play';
import Screen from './screen';

(function (ns) {
    let di = new DI();

    // Register everything
    di.register('cell', Cell, []);
    di.register('food', Food, []);
    di.register('virus', Virus, []);
    di.register('shapeFactory', ShapeFactory, [di], {singleton: true});
    di.register('pixelFactory', PixelFactory, [di], {singleton: true});
    di.register('pixelTransform', PixelTransform, ['pixelFactory'], {singleton: true});
    di.register('heartBeat', Heartbeat, [], {singleton: true});
    di.register('pixels', Pixels);
    di.register('play', Play, ['screen', 'heartbeat', ns.bot], {singleton: true});
    di.register('screen', Screen, ['pixelFactory'], {singleton: true});

    // Define global function
    ns.getSnapshots = (stride = 1) => {
        return di.getInstance('screen').flush(stride);
    };

    ns.play = () => {
        di.getInstance('play').start();
    };

    di.getInstance('screen'); // Inititalize singleton
})(window.agarioDriver = {});
