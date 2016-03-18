const SETTINGS_CLS = '.btn-settings';

export default class Agario {
    constructor(browser, webdriver) {
        this.browser = browser;
        this.webdriver = webdriver;
    }

    setup() {
        return this.browser.findElement(this.webdriver.By.css(SETTINGS_CLS))
            .then((element) => {
                return element.click()
                    .then(::this.clickCheckbox('noSkins', true))
                    .then(::this.clickCheckbox('noColors', true))
                    .then(::this.clickCheckbox('darkTheme', true))
                    .then(::this.clickCheckbox('noNames', true))
                    .then(::this.clickCheckbox('showMass', false))
                    .then(::this.clickCheckbox('skipStats', true))
            });
    }

    clickCheckbox(id, toState) {
        return new Promise((resolve, reject) => {
            this.browser.findElement(this.webdriver.By.id(id))
                .then((element) => {
                    element.click().then(() => {
                        element.getAttribute("checked")
                            .then((value) => {
                                if (!!value !== toState) {
                                    element.click().then(resolve);
                                } else {
                                    resolve();
                                }
                            });
                    })
                });
        });
    }
}
