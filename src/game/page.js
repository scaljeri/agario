import fs from 'fs';

const BTN_FB = '.btn-play',
    BTN_GUEST = '.btn-play-guest',
    BTN_SETTINGS = '.btn-settings',
    CANVAS = '#canvas',
    SETTINGS = '.btn-settings',
    FB_LOGIN = '.btn-login-play',
    FB_DIALOG = '.btn-fb',
    FB_EMAIL = '#loginform [name=email]',
    FB_PASSWD = '#loginform [name=pass]',
    FB_SUBMIT = '#loginbutton';

export default class Page {
    constructor(webdriver, browser, options) {
        this.webdriver = webdriver;
        this.browser = browser;
        this.options = options;
        this.as = new webdriver.ActionSequence(browser);
    }

    /**
     * Helper function. Find the element for the specified css
     *
     * @param css [String] - Css selector
     * @returns {*|!WebElementPromise|{then}}
     */
    findElement(css) {
        return this.browser.findElement(this.webdriver.By.css(css));
    }

    isSettingsVisible() {
        //console.log(this.webdriver.until.elementIsVisible(this.webdriver.By.css(BTN_SETTINGS)));
        //return this.webdriver.until.elementIsVisible(this.webdriver.By.css(BTN_SETTINGS));
        return this.browser.wait(() => {
            return this.browser.findElement(this.webdriver.By.css(BTN_SETTINGS))
                .then((element) => {
                    return element.isDisplayed();
                });
            //return this.webdriver.until.elementIsVisible(
        }, 1000);
    }

    gotoSettings() {
        return this.findElement(SETTINGS).click();
    }

    setSkins() {
        return this.setCheckbox('#noSkins', true)
    }

    setColors() {
        return this.setCheckbox('#noColors', true)
    }

    setTheme() {
        return this.setCheckbox('#darkTheme', true);
    }

    setNames() {
        return this.setCheckbox('#noNames', true);
    }

    setMass() {
        return this.setCheckbox('#showMass', false);
    }

    setStats() {
        return this.setCheckbox('#skipStats', true);
    }

    setCheckbox(css, state) {
        return this.findElement(css)
            .then((element) => {
                // Always check a checkbox first, because sometimes default checked-state gets ignored
                return element.click()
                    .then(() => {
                        return element.getAttribute("checked")
                            .then((isSelected) => {
                                if (!!isSelected !== state) { // isSelected is null or 'true'
                                    return element.click();
                                } else {
                                    this.webdriver.promise.when();
                                }
                            })
                    });
            });

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
        this.findElement(FB_LOGIN)
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

    /**
     * Begin the game. It depends on the `options.isGuest` to determine which play button to click on
     *
     * @returns {Promise}
     */
    start() {
        return this.findElement(this.options.isGuest ? BTN_GUEST : BTN_FB)
            .then(
                (element) => {
                    element.isDisplayed()
                        .then((state) => {
                            if (state) {
                                return element.click();
                            } else {
                                this.webdriver.promise.rejected();
                            }
                        })
                },
                (err) => {
                    console.log("Could not start the game", err);
                });
    }


    injectJS(js) {
        return new Promise((resolve, reject) => {
            fs.readFile('./bundle.js', 'utf8', (err, js) => {
                if (err) {
                    reject(err);
                }
                this.browser.executeScript(js).then(resolve);
            });
        });
    }

    getMouseCoords() {
        return this.browser.executeScript('return bot.analyse()');
    }

    getSnapshot() {
        return this.browser.executeScript('return bot.takeSnapshot()');
    }

    moveMouse(coords) {
        this.browser.findElement(this.webdriver.By.css(CANVAS))
            .then((canvas) => {
                this.as.mouseMove(canvas, coords).click().perform();
            });
    }
}
