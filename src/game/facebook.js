import Promise from 'promise';
import fs from 'fs';
import Page from './pages/facebook-page';

/**
 * This class uses webdriver to login into agario using Facebook. Although you can initiate
 * an instance providing the credentials you can also create a file called `facebook.json`
 */
export default class Facebook {
    /**
     * @param {Object} browser - this object is part from Webdriver
     * @param {Object} webdriver - this is the webdriver object
     * @param {Object} [credentials] - Object holding facebook credentials
     * @param {String} credentails.username - Facebook username
     * @param {String} credentails.password - Facebook password
     */
    constructor() {
        this.page = new Page();

        this.credentials = this.loadCredentials();
    }

    loadCredentials() {
        if (this.promise) {
            return this.promise;
        }

        return new Promise((resolve, reject) => {
            if (this.credentials) {
                resolve(this.credentials);
            } else {
                fs.readFile('./facebook.json', 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    this.credentials = JSON.parse(data);
                    resolve(this.credentials);
                });
            }
        });
    }

    /**
     * Facebook login
     * @returns {Promise}
     */
    login() {
        return this.credentials
            .then((credentials) => {
                return this.page.fbLogin(credentials);
            })
    }
}
