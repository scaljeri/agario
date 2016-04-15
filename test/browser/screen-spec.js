import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {dummyPixelFactor} from '../helpers/dummies';
import Screen from '../../src/browser/screen';
import dummyPixels from '../fixtures/dummy-pixels';


chai.should();
chai.use(sinonChai);

describe('Screen:', () => {
    let screen, spyImageData, spyContext, spySelector,
        getImageData = () => ({data: dummyPixels.pixels}),
        getContext = () => ({getImageData: getImageData});

    beforeEach(() => {
        spyContext = sinon.spy(getContext);
        spyImageData = sinon.spy(getImageData);

        global.document = {
            querySelector: () => {
                return {
                    getContext: spyContext,
                    height: dummyPixels.height,
                    width: dummyPixels.height
                }
            }
        };
        spySelector = sinon.spy(global.document, 'querySelector');

        screen = new Screen(dummyPixelFactor);
    });

    describe('#calibrate', () => {
        beforeEach(() => {
            screen.calibrate();
        });

        it('should have selected the canvas', () => {
            spySelector.should.have.been.calledWith('#canvas');
        });

        it('should have retrieved tha canvas context', () => {
            spyContext.should.have.been.calledWith('2d');
        });

        it('should have selected the canvas', () => {
            screen._ctx.should.be.defined;
        });
    });

    describe('#takeScreenshot', () => {
        let spyGetInstance;

        beforeEach(() => {
            spyGetInstance = sinon.spy(dummyPixelFactor, 'getInstance');
        });

        afterEach(() => {
            spyGetInstance.restore();
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
    })
});
