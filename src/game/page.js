const BTN_FB = '.btn-play',
      BTN_GUEST = '.btn-play-guest',
      BTN_SETTINGS = '.btn-settings';

export default class Page {
    constructor(webdriver, browser, options) {
        this.webdriver = webdriver;
        this.browser = browser;
        this.options = options;
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

    setCheckbox(id, state, isFirst = true) {
        //return new Promise((resolve, reject) => {
        if (isFirst) {
            return this.browser.findElement(this.webdriver.By.id(id)).click()
                .then(() => {
                    return this.setCheckbox(id, state, false);
                });
        } else {
            return this.browser.findElement(this.webdriver.By.id(id))
                .then((element) => {
                    if (isFirst) {
                        return element.click().then(::this.setCheckbox(id, state, false));
                    } else {
                        element.getAttribute("checked")
                        //element.isSelected()
                            .then((selected) => {
                                console.log("SEL=" + selected);
                                console.log("SEL=" + state);
                                if (selected === state) {
                                    console.log('x');
                                    this.webdriver.promise.when();
                                } else {
                                    console.log('y');
                                    element.click().then(() => {
                                        this.webdriver.promise.when();
                                    });
                                }
                            });
                    }
                });
        }
    }

    start() {
        console.log(this.options.isGuest ? BTN_GUEST : BTN_FB);
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


}
