const CREDENTIALS = {
    username: 'mock@facebook.com',
    password: 'test123'
};

import fs from './helpers/fs';
fs.setup(CREDENTIALS);

import './helpers/setup';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import spies from 'chai-spies';
import { Webdriver, Browser, Element } from './helpers/webdriver-mock';
import Facebook from '../src/game/facebook';

// Tell chai that we'll be using the "should" style assertions.
chai.use(spies);
chai.use(chaiAsPromised);

let should = chai.should();


describe('Facebook', () => {
    let browser, webdriver, element, facebook;

    beforeEach(() => {
        element = new Element();
        browser = new Browser(element);
        webdriver = new Webdriver();
    });

    describe('Credentials', () => {
        describe('Provided', () => {
            beforeEach(() => {
                facebook = new Facebook(browser, webdriver, CREDENTIALS);
            });

            it('should use them', () => {
                facebook.credentials.should.equal(CREDENTIALS)
            });
        });

        describe('Not provided', () => {
            beforeEach(() => {
                facebook = new Facebook(browser, webdriver);
            });

            it('should load the file `facebook.json', () => {
                return facebook.credentials.should.eventually.deep.equal(CREDENTIALS);
            });
        });
    });

    describe('#gotoLogin', () => {
        beforeEach(() => {
            chai.spy.on(browser, 'findElement');
            chai.spy.on(webdriver.By, 'css');
            chai.spy.on(element, 'getSize');

            facebook = new Facebook(browser, webdriver, CREDENTIALS);
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

        describe('With a login button', () => {
            let promise;

            beforeEach(() => {
                chai.spy.on(webdriver, 'resolve');
                element.setSize(200);

                promise = facebook.gotoLogin();
            });

            it('should resolve', () => {
                webdriver.resolve.should.have.been.called.once();
            });

        });
    });
});
