const BTN_FB = '.btn-play',
      BTN_GUEST = '.btn-play-guest';

export default class Page {
    constructor(webdriver, browser, options) {
        this.webdriver = webdriver;
        this.browser = browser;
        this.options = options;
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
        return this.browser.findElement(this.webdriver.By.id(id))
            .then((element) => {
                if (isFirst) {
                    element.click().then(::this.setCheckbox(id, state, false));
                } else {
                    element.isSelected()
                        .then((selected) => {
                            if (selected === state) {
                                this.webdriver.promise.when();
                            } else {
                                element.click().then(() => {
                                    this.webdriver.promise.when();
                                });
                            }
                        });
                }
            })
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
