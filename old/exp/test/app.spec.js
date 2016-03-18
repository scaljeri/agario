import chai from 'chai';
import App from '../app';
import './setup';
import MyRandom from '../random';

console.log(new MyRandom().get());
console.log(new MyRandom().name);
// Tell chai that we'll be using the "should" style assertions.
chai.should();

describe('App', () => {
    describe('#get', () => {
        let app;

        beforeEach(() => {
            app = new App();
        });

        it('returns a number', () => {
            // This will fail if "rectangle.width" does
            // not equal 10.
            console.log('-------');
            console.log(app.get());
            console.log(app.get());
            console.log(app.get());
            console.log(app.get());
            console.log(app.get());
            console.log(app.get());
            app.get().should.equal(100);
            //expect(app.get()).to.equal(8);
        });
    });
});