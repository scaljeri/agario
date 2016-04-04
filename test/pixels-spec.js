import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import data from './fixtures/pixels-dummy';
import Pixels from '../src/shared/pixels';

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);
let should = chai.should();


describe('Pixels:', () => {
    let pixels;

    beforeEach(() => {
        pixels = new Pixels();
        //pixels.set(data);
    });

    afterEach(() => {
    });

    describe('#set', () => {
        it('should not be possible to set a pixel object', () => {
            (() => {
                pixels.set({0: 1, 1: 2, 3: 4}, 1, 1);
            }).should.throw(Error, /First argument should be an array of pixels/);
        });

        it('should not be possible to set null as the first argument', () => {
            (() => {
                pixels.set(null, 1, 1);
            }).should.throw(Error, /First argument should be an array of pixels/);
        });

        it('should not be possible set a String as the first argument', () => {
            (() => {
                pixels.set('pixels', 1, 1);
            }).should.throw(Error, /First argument should be an array of pixels/);
        });

        it('should not be possible set a Number as the first argument', () => {
            (() => {
                pixels.set(1, 1);
            }).should.throw(Error, /First argument should be an array of pixels/);
        });
    });
});
