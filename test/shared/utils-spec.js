import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
//import spies from 'chai-spies';
var sinon = require("sinon");
var sinonChai = require("sinon-chai");

import * as utils from '../../src/shared/utils';

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);
let should = chai.should();


describe('Utils:', () => {
    beforeEach(() => {
    });

    afterEach(() => {
    });

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
