import Base from './base-page';

const FB_LOGIN = '.btn-login-play',
    FB_DIALOG = '.btn-fb',
    FB_EMAIL = '#loginform [name=email]',
    FB_PASSWD = '#loginform [name=pass]',
    FB_SUBMIT = '#loginbutton';

export default class FacebookPage extends Base {
    constructor() {
        super();
    }

    /**
     * Handle the whole Facebook login process. Returns a promise which resolves when
     * all the login steps are fulfiled.
     *
     * @returns {Promise}
     */
    fbLogin(credentials) {
        let origHandle;

        // Goto the FB login section if and only the FB_LOGIN button is visible
        //return new Promise((resolve, reject) => {
        return this.findElement(FB_LOGIN)
            .then((element) => {
                return element.getSize()
                    .then((size) => {
                        if (size.height > 0) {
                            return element.click()
                        } else {
                            this.webdriver.promise.rejected();
                        }
                    })
            })
            .then(() => {
                // Show FB dialog and switch focus main-window --> dialog
                return this.findElement(FB_DIALOG).click()
                    .then(() => {
                        return this.browser.getAllWindowHandles()
                            .then((handles) => {
                                // Store the original handle, because when done we need to switch back
                                origHandle = handles[0];

                                return this.browser.switchTo().window(handles[1]);
                            })
                    });
            })
            .then(() => {
                // Fill FB login form
                return this.findElement(FB_EMAIL)
                    .then((element) => element.sendKeys(credentials.username))
                    .then(() => {
                        return this.findElement(FB_PASSWD)
                            .then((element) => element.sendKeys(credentials.password))
                    })
                    .then(() => {
                        // Submit and move focus to main window
                        return this.findElement(FB_SUBMIT)
                            .then((element) => element.click())
                            .then(() => this.browser.switchTo().window(origHandle))
                    });
            });
    }
}
