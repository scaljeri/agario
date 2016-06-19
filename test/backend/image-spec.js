import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import DI from 'javascript-dependency-injection';

import dummyPixels from '../fixtures/dummy-pixels';
import Image from '../../src/backend/image';

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);

let should = chai.should();
let di = new DI();



describe('Image:', () => {
    let image, spy,
        fs = {
            createWriteStream: () => {},
            existsSync: () => {},
            mkdirSync: () => {}
        },
        pixelsRetVal = {
            pipe: () => {}
        },
        savePixels = () => {
            return pixelsRetVal;
        };

    beforeEach(() => {
        di.register('$image', Image, [fs, () => {}, savePixels, () => {}]);
        image = di.getInstance('$image');
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
        let spyFs, spyPipe, dirname = './dir', filename = 'screenshot.png';

        beforeEach(() => {
            let data = dummyPixels();
            image = di.getInstance('$image', dirname);
            spy = sinon.stub(image, 'filename').returns(filename);
            spyFs = sinon.stub(fs, 'createWriteStream').returns('stream');
            spyPipe = sinon.spy(pixelsRetVal, 'pipe');

            image.set(data.pixels, data.height, data.width, 4)
                 .save()
        });

        it('should create an image', () => {
            fs.createWriteStream.should.have.been.calledWith(`${dirname}/${filename}`);
            spyPipe.should.have.been.calledWith('stream');
        });
    });
});
