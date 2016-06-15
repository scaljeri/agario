import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {dummyPixelFactor} from '../helpers/dummies';
import Screen from '../../src/browser/screen';
import dummyPixels from '../fixtures/dummy-pixels';


chai.should();
chai.use(sinonChai);

describe('Screen:', () => {
    let screen, spyAddEventListener, spyImageData, spyContext, spySelector, spyTakeSnapshot,
        getImageData = () => ({data: dummyPixels.pixels}),
        getContext = () => ({getImageData: getImageData}),
        addEventListener = () => {};

    beforeEach(() => {
        spyAddEventListener = sinon.spy(addEventListener);
        spyContext = sinon.spy(getContext);
        spyImageData = sinon.spy(getImageData);

        global.document = {
            body: {
                addEventListener: spyAddEventListener
            },
            querySelector: () => {
                return {
                    addEventListener: spyAddEventListener,
                    getContext: spyContext,
                    height: dummyPixels.height,
                    width: dummyPixels.height,
                }
            }
        };
        spySelector = sinon.spy(global.document, 'querySelector');

        screen = new Screen(dummyPixelFactor);
        //spyTakeSnapshot = sinon.spy(screen, 'takeScreenshot');
    });

    describe('#constructor', () => {
        it('should listen to keydown events', () => {
            spyAddEventListener.args[0][0].should.equal('keydown');
        });
    });

    describe('#calibrate', () => {
        beforeEach(() => {
            screen.calibrate();
        });

        it('should query the canvas', () => {
            spySelector.should.have.been.calledWith('#canvas');
        });

        it('should have retrieved tha canvas context', () => {
            spyContext.should.have.been.calledWith('2d');
        });
    });
    describe('#takeScreenshot', () => {
        let spyGetInstance, spyCalibrate;

        beforeEach(() => {
            spyGetInstance = sinon.spy(dummyPixelFactor, 'getInstance');
            spyCalibrate = sinon.spy(screen, 'calibrate');
        });

        afterEach(() => {
            spyGetInstance.restore();
        });

        it('should initialize using #calibrate', () => {
            screen.takeScreenshot();
            spyCalibrate.should.have.been.called;
        });

        it('should initialize only once using #calibrate', () => {
            screen.takeScreenshot();
            screen.takeScreenshot();
            spyCalibrate.should.have.been.called.once;
        });

        it('should instantiate a pixel with pixel data', () => {
            screen.takeScreenshot();
            spyGetInstance.should.have.been.calledWith(dummyPixels.pixels, dummyPixels.height, dummyPixels.width, 4);
        });

        it('should return a ndarray with default stride (no params)', () => {
            screen.takeScreenshot().should.equal(1);
        });

        it('should return a ndarray with a stride of 1', () => {
            screen.takeScreenshot(1).should.equal(1);
        });

        it('should return a ndarray with a stride of 4', () => {
            screen.takeScreenshot(4).should.equal(4);
        });
    });

    describe('#flush', () => {

    });
});
