import Promise from 'promise';
import fs from 'fs';

/**
 * This class uses webdriver to login into agario using Facebook. Although you can initiate
 * an instance providing the credentials you can also create a file called `facebook.json`
 */
export default class Facebook {
    static get LOGIN_CLS() { return '.btn-login-play'; }

    /**
     * @param {Object} browser - this object is part from Webdriver
     * @param {Object} webdriver - this is the webdriver object
     * @param {Object} [credentials] - Object holding facebook credentials
     * @param {String} credentails.username - Facebook username
     * @param {String} credentails.password - Facebook password
     */
    constructor(browser, webdriver, credentials) {
        this.browser = browser;
        this.webdriver = webdriver;

        this.credentials = credentials || this.loadCredentials();
    }

    loadCredentials() {
        if (this.promise) {
            return this.promise;
        }

        return new Promise((resolve, reject) => {
            fs.readFile('./facebook.json', 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                }
                this.credentials = JSON.parse(data);
                resolve(this.credentials);
            });
        });
    }

    /**
     * Facebook login
     * @returns {Promise}
     */
    login() {
        return this.gotoLogin() // Make sure we can login
            .then(activateFacebookLogin, reject)
            .then(enterCredentials)
            .then(submitForm)
    }

    /**
     * Go to the login section
     * @returns {Promise}
     */
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

    /**
     * On the login section, select Facebook
     */
    activateFacebookLogin() {

    }

    /**
     * In the facebook dialog, enter the credentials
     */
    enterCredentials() {

    }

    /**
     * Submit facebook credentials
     */
    submitForm() {

    }
}
