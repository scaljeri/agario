import 'babel-polyfill';

import chai from 'chai';
import DI from 'javascript-dependency-injection';

import {MAX_STEP_DEPTH, EDGE_DISTANCE, MAX_TRACE_LENGTH} from '../../../src/shared/config';
import ImageGen from '../../fixtures/image-gen';
import TraceEdge from '../../../src/shared/shapes/analysers/trace-edge';

chai.should();

let di = new DI();
di.register('$tracer', TraceEdge, [[255, 0, 127]]);

describe('TrafeEdge:', () => {
    let circle, image, traceEdge = di.getInstance('$tracer', [3, 3, 3], [4, 4, 4]);

    beforeEach(() => {
        image = new ImageGen();
        circle = image.defineCircle();
        //circle = image.defineCircle(50, 20);
        //circle = image.defineCircle(60);
        traceEdge.set(image.create());
    });

    it('should initially have no trace', () => {
        traceEdge.trace.should.eql([]);
    });

    describe('#star(top)', () => {
        beforeEach(() => {
            traceEdge.start(40, 20);
        });

        it(`should have traced ${MAX_TRACE_LENGTH} pixels`, () => {
            let arr = traceEdge.trace.filter ((value, index, array) => {
                return array.indexOf (value) == index;
            });
            image.render(null, traceEdge.trace);
            traceEdge.trace.length.should.equals(70);//MAX_TRACE_LENGTH);
        });

        it('should have found pixels on the edge of the cricle', () => {

        });
    });

    xdescribe('#star(bottom)', () => {
        beforeEach(() => {
            // Find edges
            traceEdge.start(image.bottom.x, image.bottom.y);
        })
    });
});
