import 'babel-polyfill';

import chai from 'chai';
import DI from 'javascript-dependency-injection';

import {imageData} from '../fixtures/image-data';
import TraceEdge from '../../src/shared/shapes/trace-edge';

chai.should();

let di = new DI();
di.register('$traceedge', TraceEdge);

describe('Circle:', () => {
    let image, traceEdge = di.getInstance('$traceedge');

    beforeEach(() => {
        image = imageData();
        traceEdge.setImage(image);
    });

    it('should initially have no trace', () => {
        traceEdge.trace.should.eql([]);
    });

    describe('#star(top)', () => {
        beforeEach(() => {
            // Find edges
            traceEdge.start(image.top);
        })
    });

    describe('#star(bottom)', () => {
        beforeEach(() => {
            // Find edges
            traceEdge.start(image.bottom.x, image.bottom.y);
        })
    });
});
