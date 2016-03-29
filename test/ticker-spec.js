import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
//import spies from 'chai-spies';
var sinon = require("sinon");
var sinonChai = require("sinon-chai");

import Ticker from '../src/shared/ticker';

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);
//chai.use(spies);
let should = chai.should();


describe('Ticker:', () => {
    let ticker = Ticker.getInstance(),
        origSetTimeout;

    beforeEach(() => {
        ticker.reset(); // Need to reset the singleton each run
        origSetTimeout = setTimeout;
        setTimeout = () => {
        };
    });

    afterEach(() => {
        setTimeout = origSetTimeout;
    });

    it('should not be possible to create a new instance', () => {
        (() => {
            new Ticker();
        }).should.throw(Error, /Cannot construct singleton/);
    });

    describe('#fps', () => {
        it('should have a default FPS', () => {
            ticker.fps.should.equal(10);
        });
        it('should set the FPS', () => {
            ticker.fps = 20;
            ticker.fps.should.equal(20);
        });

        it('should ignore a string as input', () => {
            ticker.fps = 'this is not a FPS';
            ticker.fps.should.equal(10);
        });
    });

    describe('#on / #off', () => {
        let cb1, cb2, cb3, cb4, cb5;

        beforeEach((done) => {
            cb1 = sinon.stub().returns(Promise.resolve());
            cb2 = sinon.stub().returns(Promise.resolve());
            cb3 = sinon.stub().returns(Promise.resolve());
            cb4 = sinon.stub().returns(Promise.resolve());
            cb5 = sinon.stub().returns(Promise.resolve());
            ticker.on('test1', cb1,);
            ticker.on('test2', cb2, {skip: 2});
            ticker.on('test3', cb3, {terminal: true, skip: 2});
            ticker.on('test4', cb4, {priority: 2});
            ticker.on('test5', cb5);

            ticker.tick().then(done);
        });

        describe('First tick', () => {
            it('should not have called the 1st cb (no options)', () => {
                //promise.should.be.fulfilled.then(() => {
                cb1.should.not.have.been.called;
                //}).should.notify(done);
            });

            it('should not have been called 2nd (skip = 2)', () => {
                cb2.should.not.have.been.called;
            });

            it('should have been called 3rd (terminal + skip = 2)', () => {
                cb3.should.have.been.called;
            });

            it('should have called the 4th (prio 1)', () => {
                cb4.should.have.been.called;
            });

            it('should not have called the 5th (no options)', () => {
                cb5.should.have.not.been.called;
            });

            it('should have called the prio 1 first', () => {
                cb4.should.have.been.calledBefore(cb3);
            });
        });

        describe('Second tick', () => {
            beforeEach((done) => {
                ticker.tick().then(done); // Second tick
            });

            it('should have called 1st twice (no options)', () => {
                cb1.should.have.been.calledOnce;
            });

            it('should not have called the 2dn (skip = 2)', () => {
                cb2.should.not.have.been.called;
            });

            it('should have called the 3rd once (terminal + skip = 2)', () => {
                cb3.should.have.been.calledOnce;
            });

            it('should have called the 4th twice (prio 1)', () => {
                cb4.should.have.been.calledTwice;
            });

            it('should have called the 5th once (no options)', () => {
                cb5.should.have.been.calledOnce;
            });
        });
    });
});
