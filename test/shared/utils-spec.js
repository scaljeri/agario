import chai from 'chai';

import * as utils from '../../src/shared/utils';

chai.should();

describe('Utils:', () => {
    describe('#isNumber', () => {
        it('should pass zero', () => {
            utils.isNumber(0).should.be.ok;
        });

        it('should pass an integer', () => {
            utils.isNumber(1).should.be.ok;
        });

        it('should pass a float', () => {
            utils.isNumber(1.1).should.be.ok;
        });

        it('should not pass NaN', () => {
            utils.isNumber(NaN).should.not.be.ok;
        });

        it('should not pass Infinity', () => {
            utils.isNumber(Infinity).should.not.be.ok;
        });

        it('should not pass an Object', () => {
            utils.isNumber({}).should.not.be.ok;
        });

        it('should not pass an invalid number as a String', () => {
            utils.isNumber('9a').should.not.be.ok;
        });

        it('should pass a valid number as a String', () => {
            utils.isNumber('9').should.be.ok;
        });
    });
});
