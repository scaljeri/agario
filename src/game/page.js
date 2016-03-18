import fs from 'fs';

const BTN_FB = '.btn-play',
    BTN_GUEST = '.btn-play-guest',
    BTN_SETTINGS = '.btn-settings',
    CANVAS = '#canvas';

export default class Page {
    constructor(webdriver, browser, options) {
        this.webdriver = webdriver;
        this.browser = browser;
        this.options = options;
        this.as = new webdriver.ActionSequence(browser);
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

    getByCls(cls) {
        return this.browser.findElement(this.webdriver.By.css(cls))
    }

    setSkins(state = true) {
        return this.setCheckbox('noSkins', state)
    }

    setColors(state = true) {
        return this.setCheckbox('noColors', state)
    }

    setTheme(state = true) {
        return this.setCheckbox('darkTheme', state);
    }

    setNames(state = true) {
        return this.setCheckbox('noNames', state);
    }

    setMass(state = false) {
        return this.setCheckbox('showMass', state);
    }

    setStats(state = true) {
        return this.setCheckbox('skipStats', state);
    }

    setCheckbox(id, state) {
        return new Promise((resolve, reject) => {
            this.browser.findElement(this.webdriver.By.id(id))
                .then((element) => {
                    element.click().then(() => {
                        element.getAttribute("checked")
                            .then((value) => {
                                if (!!value !== state) {
                                    element.click().then(resolve);
                                } else {
                                    resolve();
                                }
                            });
                    })
                });
        });
    }

    start() {
        return this.browser.findElement(this.webdriver.By.css(this.options.isGuest ? BTN_GUEST : BTN_FB))
            .then((element) => {
                element.isDisplayed().then((state) => {
                    if (state) {
                        return element.click();
                    } else {
                        this.webdriver.promise.rejected();
                    }
                });
            }, function (err) {
                console.log("error");
                console.log(err);
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

    moveMouse(coords) {
        this.browser.findElement(this.webdriver.By.css(CANVAS))
            .then((canvas) => {
                this.as.mouseMove(canvas, coords).click().perform();
            });
    }
}
