import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);

let should = chai.should();

import mock from 'mock-fs';
import fs from 'fs';

import dummyPixels from '../fixtures/dummy-pixels';
import Image from '../../src/backend/image';


describe('Image:', () => {
    let image, spy;

    beforeEach(() => {
        image = new Image();
    });

    describe('#filename', () => {
        it('should generate a string', () => {
            image.filename().should.be.a('string');
        });

        it('should have a png extension', () => {
            image.filename().should.match(/\.png$/);
        });

        it('should generate random strings', () => {
            let file1 = image.filename(),
                file2 = image.filename();

            file1.should.not.equals(file2);
        });

        it('should generate a string of 9 chars', () => {
            image.filename().should.have.length(9);
        });
    });

    describe('#save', () => {
        beforeEach(() => {
            mock({});
            image = new Image('./dir');
            spy = sinon.stub(image, 'filename').returns('screenshot.png');

            image.set(dummyPixels.pixels, dummyPixels.height, dummyPixels.width, 4)
                 .save()
        });

        afterEach(() => {
            mock.restore();
        });

        it('should create an image', () => {
            fs.lstatSync('./dir/screenshot.png').isFile().should.be.ok;
        });
    });
});
