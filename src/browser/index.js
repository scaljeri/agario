import DI from 'javascript-dependency-injection';

import Screen from './screen';
import Pixels from '../shared/pixels';
import Heartbeat from '../shared/heartbeat';
import DiPixelFactory from '../shared/di-pixel-factory';

(function (ns) {
    let di = new DI();

    di.register('screen', Screen, ['diPixelFactory'], { singelton: true});
    di.register('diPixelFactory', DiPixelFactory, [di], { singleton: true});
    di.register('heartBeat', Heartbeat, [], { singleton: true });

    ns.takeScreenshot = (stride = 1) => {
        return screen.takeScreenshot(stride);
    };

})(window.agarioDriver = {});
