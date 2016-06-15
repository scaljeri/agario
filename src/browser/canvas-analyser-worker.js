import DI from 'javascript-dependency-injection';

import Virus from '../shared/shapes/virus';
import Cell from '../shared/shapes/cell';
import Food from '../shared/shapes/food';
import PixelTransform from '../shared/pixel-transform';

self.addEventListener('message', (e) => {
    let cmd = e.data.cmd,
        pixels = e.data.pixels;

    switch (data.cmd) {
        case 'refresh':
            //self.postMessage(....);
            break;
        case 'increment':
            //self.postMessage( ..... );
            //self.close(); // Terminates the worker.
            break;
        default:
            ;//self.postMessage('Unknown command: ' + data.msg);
    }
}, false);
