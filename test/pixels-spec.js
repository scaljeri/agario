import chai from 'chai';

import data from './fixtures/pixels-dummy';
import Pixels from '../src/shared/pixels';

chai.should();
let should = chai.should();


describe('Pixels:', () => {
    let pixels;

    beforeEach(() => {
        pixels = new Pixels();
        pixels.set(data.pixels, data.width, data.height);
    });

    it('should have a height', () => {
        pixels.height.should.equals(data.width);
    });

    it('should have a height', () => {
        pixels.height.should.equals(data.width);
    });

    it('should have a stride', () => {
        pixels.stride.should.equals(data.stride);
    });

    describe('#ndarray (default stride)', () => {
        let ndarray;

        beforeEach(() => {
            ndarray = pixels.ndarray();
        });

        it('should have the original pixel array', () => {
            ndarray.data.should.equals(data.pixels);
        });

        it('should have a stride', () => {
            ndarray.stride.should.eql([data.stride, data.stride * data.width, 1]);
        });

        it('should have a shape', () => {
            ndarray.shape.should.eql([data.width, data.height, data.stride]);
        });

        it('should have an offset', () => {
            ndarray.offset.should.equals(0);
        });
    });

    describe('#ndarray with a stride of 1', () => {
        let ndarray;

        beforeEach(() => {
            ndarray = pixels.ndarray(1);
        });

        it('should have a pixel array', () => {
            ndarray.data.length.should.equals(data.pixels.length);
            ndarray.data[0].should.equals(data.pixels[0]);
            ndarray.data[1].should.equals(data.pixels[1]);
            ndarray.data[2].should.equals(data.pixels[2]);
        });

        it('should have a stride', () => {
            ndarray.stride.should.eql([1, data.width, 1]);
        });

        it('should have a shape', () => {
            ndarray.shape.should.eql([data.width, data.height, 1]);
        });

        it('should have an offset', () => {
            ndarray.offset.should.equals(0);
        });
    });

    describe('#ndarray with a stride of 2', () => {
        let ndarray;

        beforeEach(() => {
            ndarray = pixels.ndarray(2);
        });

        it('should have a pixel array', () => {
            ndarray.data.length.should.equals(data.pixels.length / 2);
            ndarray.data[0].should.equals(data.pixels[0]);
            ndarray.data[1].should.equals(data.pixels[2]);
            ndarray.data[2].should.equals(data.pixels[4]);
        });

        it('should have a stride', () => {
            ndarray.stride.should.eql([2, 2 * data.width, 1]);
        });

        it('should have a shape', () => {
            ndarray.shape.should.eql([data.width, data.height, 2]);
        });

        it('should have an offset', () => {
            ndarray.offset.should.equals(0);
        });
    });

    describe('#get', () => {
        it('should return the correct values given x and y', () => {
            pixels.get(0, 0).should.equals(0);
            pixels.get(1, 0).should.equals(4);
            pixels.get(0, 1).should.equals(36);
            pixels.get(1, 1).should.equals(40);
        });

        describe('With a stride of 2', () => {
            beforeEach(() => {
                pixels.set(data.pixels, data.width, data.height, 2);
            });

            it('should return the correct values given x and y', () => {
                pixels.get(0, 0).should.equals(0);
                pixels.get(1, 0).should.equals(2);
                pixels.get(0, 1).should.equals(18);
                pixels.get(1, 1).should.equals(20);
            });
        });

        describe('With a stride of 1', () => {
            beforeEach(() => {
                pixels.set(data.pixels, data.width, data.height, 1);
            });

            it('should return the correct values given x and y', () => {
                pixels.get(0, 0).should.equals(0);
                pixels.get(1, 0).should.equals(1);
                pixels.get(0, 1).should.equals(9);
                pixels.get(1, 1).should.equals(10);
            });
        })
    })
});
