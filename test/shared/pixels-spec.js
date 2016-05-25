import chai from 'chai';

import data from '../fixtures/dummy-pixels';
import Pixels from '../../src/shared/pixels';

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

    describe('#iterator', () => {
        let item, iter;

        describe('With default stride (4)', () => {
            beforeEach(() => {
                iter = pixels.iterator();
            });

            it('should return the correct values', () => {
                iter.next().value.should.equals(0);
                iter.next().value.should.equals(4);
                iter.next().value.should.equals(8);
            });

            it('should be done after data.length/4 values', () => {
                for(let i = 0; i < data.pixels.length; i+= 4) {
                    item = iter.next();

                    item.done.should.not.be.ok;
                    item.value.should.be.a.number;
                }

                iter.next().done.should.be.ok;
            });
        });


        describe('With a stride of 2', () => {
            beforeEach(() => {
                pixels.set(data.pixels, data.width, data.height, 2);
                iter = pixels.iterator();
            });

            it('should be done after data.length/2 values', () => {
                for(let i = 0; i < data.pixels.length; i+= 2) {
                    item = iter.next();

                    item.done.should.not.be.ok;
                    item.value.should.be.a.number;
                }

                iter.next().done.should.be.ok;
            });
        });

        describe('With a stride of 1', () => {
            beforeEach(() => {
                pixels.set(data.pixels, data.width, data.height, 1);
                iter = pixels.iterator();
            });

            it('should be done after data.length values', () => {
                for(let i = 0; i < data.pixels.length; i++) {
                    item = iter.next();

                    item.done.should.not.be.ok;
                    item.value.should.be.a.number;
                }

                iter.next().done.should.be.ok;
            });

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
        });
    })
});
