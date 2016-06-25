import 'babel-polyfill';

import chai from 'chai';
import DI from 'javascript-dependency-injection';

import ImageGen from '../fixtures/image-gen';
import TraceEdge from '../../src/shared/shapes/trace-edge';

chai.should();

let di = new DI();
di.register('$traceedge', TraceEdge);

describe('Circle:', () => {
    let circle, image, traceEdge = di.getInstance('$traceedge', [3,3,3], [4,4,4]);

    beforeEach(() => {
        image = new ImageGen();
        circle = image.defineCircle();
        //circle = image.defineCircle(50, 20);
        //circle = image.defineCircle(60);
        traceEdge.setImage(image.create());
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
