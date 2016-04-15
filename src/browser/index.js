import DI from 'javascript-dependency-injection';

import Pixels from '../shared/pixels';
import Heartbeat from '../shared/heartbeat';
import DiPixelFactory from '../shared/di-pixel-factory';
import Play from './play';
import Screen from './screen';

(function (ns) {
    let di = new DI();

    // Register everything
    di.register('diPixelFactory', DiPixelFactory, [di], {singleton: true});
    di.register('heartBeat', Heartbeat, [], {singleton: true});
    di.register('pixels', Pixels);
    di.register('play', Play, ['screen', 'heartbeat', ns.bot], {singleton: true});
    di.register('screen', Screen, ['diPixelFactory'], {singleton: true});

    // Define global function
    ns.takeScreenshot = (stride = 1) => {
        return di.getInstance('screen').takeScreenshot(stride);
    };

    ns.play = () => {
        di.getInstance('play').start();
    };
})(window.agarioDriver = {});
