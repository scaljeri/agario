import Promise from 'promise';
import fs from 'fs';

function loadCredentials() {
    fs.readFile('./credentials.txt', 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        this.credentials = JSON.parse(data);
    });
}

/**
 * This class uses webdriver to login into agario using Facebook. Although you can initiate
 * an instance providing the credentials you can also create a file called `facebook.json`
 */
export default class Facebook {
    static get LOGIN_CLS() {
        return '.btn-login-play';
    }

    /**
     * @param {Object} browser - this object is part from Webdriver
     * @param {Object} webdriver - this is the webdriver object
     * @param {Object=} credentials - Object holding facebook credentials
     * @param {String} credentails.username - Facebook username
     * @param {String} credentails.password - Facebook password
     */
    constructor(browser, webdriver, credentials) {
        this.browser = browser;
        this.webdriver = webdriver;

        if (!credentials) {
            loadCredentials.call(this);
        } else {
            this.credentials = credentials;
        }
    }

    login() {
        return this.gotoLogin() // Make sure we can login
            .then(activateFacebookLogin, reject)
            .then(enterCredentials)
            .then(submitForm)
    }

    gotoLogin() {
        return this.browser.findElement(this.webdriver.By.css(Facebook.LOGIN_CLS))
            .then((element) => {
                element.getSize().then((size) => {
                    if (size.height > 0) {
                        this.webdriver.resolve(element);
                    } else {
                        this.webdriver.reject();
                    }
                })
            });
    }

    activateFacebookLogin() {

    }

    enterCredentials() {

    }

    submitForm() {

    }
}
