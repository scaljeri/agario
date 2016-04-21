import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import Heartbeat from '../../src/shared/heartbeat';

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);

let should = chai.should();


describe('Heartbeat:', () => {
    let beat = new Heartbeat(),
        origSetTimeout;

    beforeEach(() => {
        beat.reset(); // Need to reset the singleton each run
        origSetTimeout = setTimeout;
        setTimeout = () => {
        };
    });

    afterEach(() => {
        setTimeout = origSetTimeout;
    });

    /*
    it('should not be possible to create a new instance', () => {
        (() => {
            new Heartbeat();
        }).should.throw(Error, /Cannot construct singleton/);
    }); */

    describe('#fps', () => {
        it('should have a default FPS', () => {
            beat.fps.should.equal(10);
        });
        it('should set the FPS', () => {
            beat.fps = 20;
            beat.fps.should.equal(20);
        });

        it('should ignore a string as input', () => {
            beat.fps = 'this is not a FPS';
            beat.fps.should.equal(10);
        });
    });

    describe('Ticking (#on / #off)', () => {
        let cb1, cb2, cb3, cb4, cb5, cb6;

        beforeEach(() => {
            cb1 = sinon.stub().returns(Promise.resolve());
            cb2 = sinon.stub().returns(Promise.resolve());
            cb3 = sinon.stub().returns(Promise.resolve());
            cb4 = sinon.stub().returns(Promise.resolve());
            cb5 = sinon.stub().returns(Promise.resolve());
            cb6 = sinon.stub().returns(Promise.resolve());
            beat.on('test1', cb1,);
            beat.on('test2', cb2, {skip: 2});
            beat.on('test3', cb3, {terminal: true, skip: 2});
            beat.on('test4', cb4, {priority: 2});
            beat.on('test5', cb5);
            beat.on('test6', cb6, {priority: -1});
        });

        describe('First tick', () => {
            beforeEach((done) => {
                beat.tick().then(done);
            });

            it('should not be possible to register duplicate key', () => {
                (() => {
                    beat.on('test1', () => {})
                }).should.throw(Error, /#on Error: Duplicate key test1/);
            });

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

            it('should not have called the 6th callback', () => {
                cb6.should.have.not.been.called;
            });

            it('should have called the prio 1 first', () => {
                cb4.should.have.been.calledBefore(cb3);
            });
        });

        describe('Second tick', () => {
            beforeEach((done) => {
                beat.tick()
                    .then(::beat.tick) // Second tick
                    .then(done);
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

            it('should have called the 6th callback', () => {
                cb6.should.have.been.called;
            });
        });

        describe('Remove callbacks', () => {
            beforeEach((done) => {
                beat.off('test3');
                beat.tick().then(done);
            });

            it('should not have called the 3rd callback', () => {
                cb3.should.not.have.been.called;
            });

            it('should not have called the 1st cb (no options)', () => {
                // without cb3, cb1 should be called
                cb1.should.have.been.called;
            });
        })
    });

    describe('#start', () => {
        let clock, spyTick, innerCb, timeoutSpy, startPromise,
            promise = () => {
            };

        beforeEach(() => {
            clock = sinon.useFakeTimers();

            spyTick = sinon.stub(beat, 'tick').returns({
                then: (cb) => {
                    innerCb = cb;
                    return promise;
                }
            });

            timeoutSpy = sinon.stub(global, 'setTimeout').returns(null);
            startPromise = beat.start();
            clock.tick(50);
        });

        afterEach(() => {
            spyTick.restore();
            clock.restore();
        });

        it('should start a tick', () => {
            spyTick.should.have.been.called;
            beat.isBusy.should.be.ok;
        });

        it('should return the promise from the #tick', () => {
            promise.should.equals(startPromise);
        });

        it('should not start a new tick if still busy', () => {
            beat.start();

            spyTick.should.have.been.calledOnce;
        });

        it('should be be ready for the next tick if promise resolves', () => {
            innerCb();

            beat.isBusy.should.not.be.ok;
        });

        it('should schedule the next tick', () => {
            innerCb();

            timeoutSpy.should.have.been.calledOnce;
            timeoutSpy.args[0][0].should.be.instanceOf(Function);
            timeoutSpy.args[0][1].should.equal(0);
        });

        it('should schedule immidiatly if tick took longer than a frame', () => {
            clock.tick(51);
            innerCb();

            timeoutSpy.should.have.been.calledOnce;
            timeoutSpy.args[0][0].should.be.instanceOf(Function);
            timeoutSpy.args[0][1].should.equal(0);
        });
    });

    describe('#stop', () => {
        let innerCb, spy, tick, promise = () => {
        };

        beforeEach(() => {
            tick = sinon.stub(beat, 'tick').returns({
                then: (cb) => {
                    innerCb = cb;
                    return promise;
                }
            });

            spy = sinon.stub(global, 'clearTimeout').returns(null);
            sinon.stub(global, 'setTimeout').returns(9);

            beat.start();
            innerCb();

            beat.stop();
        });

        afterEach(() => {
            tick.restore();
            spy.restore();
        });

        it('should clear the scheduled tick', () => {
            spy.should.have.been.calledOnce;
            spy.args[0][0].should.equal(9);
        });

        it('should not be busy', () => {
            beat.isBusy.should.not.be.ok;
        });

    });
});
