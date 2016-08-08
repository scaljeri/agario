import 'babel-polyfill';

import chai from 'chai';
import DI from 'javascript-dependency-injection';

import {MAX_STEP_DEPTH, EDGE_DISTANCE, MAX_TRACE_LENGTH} from '../../../src/shared/config';
import ImageGen from '../../fixtures/image-gen';
import TraceEdge from '../../../src/shared/shapes/analysers/trace-edge';

chai.should();

let di = new DI();
di.register('$tracer', TraceEdge, [[255, 0, 127]]);

describe('TraceEdge:', () => {
    let circle, image, traceEdge = di.getInstance('$tracer', [3, 3, 3], [4, 4, 4]);

    describe('Small circle', () => {
        beforeEach(() => {
            image = new ImageGen(100, 100);
            circle = image.defineCircle();//100, 1000, 970);//500, 500, 200);
            traceEdge.set(image.create());
        });

        it('should initially have no trace', () => {
            traceEdge.trace.should.eql([]);
        });

        describe('#star(top)', () => {
            beforeEach(() => {
                console.log("=================================");
                traceEdge.start(...image.getTop());
            });

            it(`should have traced from the top down`, () => {
                image.render(null, traceEdge.trace);
                traceEdge.trace.length.should.equals(MAX_TRACE_LENGTH);
            });
        });

        xdescribe('#star(bottom)', () => {
            beforeEach(() => {
                traceEdge.start(...image.getBottom());
            });

            it(`should have traced from the bottom up`, () => {
                //image.render(null, traceEdge.trace);
                traceEdge.trace.length.should.equals(MAX_TRACE_LENGTH);
            });
        });
    });

    describe('Huge circle', () => {
        beforeEach(() => {
            image = new ImageGen(100, 100);
            circle = image.defineCircle();//100, 1000, 970);//500, 500, 200);
            traceEdge.set(image.create());
        });

        it('should initially have no trace', () => {
            traceEdge.trace.should.eql([]);
        });

        describe('#star(top)', () => {
            beforeEach(() => {
                console.log("=================================");
                traceEdge.start(...image.getTop());
            });

            it(`should have traced from the top down`, () => {
                image.render(null, traceEdge.trace);
                traceEdge.trace.length.should.equals(MAX_TRACE_LENGTH);
            });
        });

        xdescribe('#star(bottom)', () => {
            beforeEach(() => {
                traceEdge.start(...image.getBottom());
            });

            it(`should have traced from the bottom up`, () => {
                //image.render(null, traceEdge.trace);
                traceEdge.trace.length.should.equals(MAX_TRACE_LENGTH);
            });
        });
    });
});
