import 'babel-polyfill';
import chai from 'chai';
import Victor from 'victor';
import numeric from 'numeric';
import DI from 'javascript-dependency-injection';

import circleData from '../fixtures/circle-data';
import Circle from '../../src/shared/shapes/circle';

chai.should();

let di = new DI();
di.register('$circle', Circle, ['$victorFactory', numeric]);
di.register('$victor', Victor);

describe('Circle:', () => {
    let circle, data;

    beforeEach(() => {
        circle = di.getInstance('$circle');
        data = circleData();
    });

    describe('#construct', () => {
        beforeEach(() => {
            circle.approximate(data);
        });

        it('should have a center of type Victor', () => {
            circle.center.should.be.instanceOf(Victor);
        });

        it('should have a center with x and y', () => {
            circle.center.x.should.equals(12);
            circle.center.y.should.equals(13);
        });

        it('should have radius', () => {
           circle.radius.should.be.closeTo(4, .000001);
        });
    });
});
