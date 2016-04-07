import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.should();
chai.use(sinonChai);

let should = chai.should();

import mock from 'mock-fs';

import Image from '../../src/backend/image';


describe('Image:', () => {
    let image, spy;

    beforeEach(() => {
        mock({
            'screenshot.png': 'bar foo'
        });

        image = new Image();

        //spy = sinon.stub(image, 'filename').returns('screenshot.png');
    });

    afterEach(() => {
        mock.restore();
    });

    describe('#filename', () => {
        it('should generate a string', () => {
            image.filename().should.be.a('string');
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

    it('test', () => {
        //let output = image.filename();

        //output.should.equals('screenshot.png');
        //spy.should.have.been.called;
    });
});
