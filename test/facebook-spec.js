import './helpers/setup';
import chai from 'chai';
import spies from 'chai-spies';
import { Webdriver, Browser, Element } from './helpers/webdriver-mock';
import Facebook from '../src/game/facebook';

// Tell chai that we'll be using the "should" style assertions.
chai.use(spies);
chai.should();

describe('Facebook', () => {
    let browser, webdriver, element, facebook;

    beforeEach(() => {
        element   = new Element();
        browser   = new Browser(element);
        webdriver = new Webdriver();

        facebook  = new Facebook(browser, webdriver, {
            username: 'mocha@facebook.com',
            password: 'chai-should'
        });
    });

    describe('#gotoLogin', () => {
        beforeEach(() => {
            chai.spy.on(browser, 'findElement');
            chai.spy.on(webdriver.By, 'css');
            chai.spy.on(element, 'getSize');
        });

        describe('Without a login button', () => {
            beforeEach(() => {
                chai.spy.on(webdriver, 'reject');

                facebook.gotoLogin();
            });

            it('should try to find the login button', () => {
                browser.findElement.should.have.been.called.once();
                browser.findElement.should.have.been.called.with(Facebook.LOGIN_CLS);
            });

            it('should use css to find to button', () => {
                webdriver.By.css.should.be.spy;
                webdriver.By.css.should.have.been.called.once();
            });

           it('should reject the promise', () => {
               webdriver.reject.should.have.been.called.once();
           });
        });
    });
});