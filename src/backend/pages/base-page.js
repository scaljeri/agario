import webdriver from 'selenium-webdriver';

let browser;

export default class BasePage {
    static get browser() {
        if (!browser) {
            browser = new webdriver.Builder().usingServer().withCapabilities({
                'browserName': 'chrome',
                'reuse_browser': false
            }).build();
        }

        return browser;
    }


    constructor(options) {
        this.options = options;
        this.webdriver = webdriver;
        this.browser = BasePage.browser;
    }

    /**
     * Helper function. Find the element for the specified css
     *
     * @param css [String] - Css selector
     * @returns {*|!WebElementPromise|{then}}
     */
    findElement(css, checkState = false) {
        let promise = this.browser.findElement(webdriver.By.css(css));

        if (checkState) {
            promise.then((element) => {
                return element.getSize()
                    .then((size) => {
                        if (size.height > 0) {
                            this.webdriver.primise.when(element);
                        } else {
                            this.webdriver.promise.rejected();
                        }
                    });
            });
        }

        return promise;
    }

    isSettingsVisible() {
        return this.findElement(BTN_SETTINGS).isDisplayed();
        //console.log(this.webdriver.until.elementIsVisible(this.webdriver.By.css(BTN_SETTINGS)));
        //return this.webdriver.until.elementIsVisible(this.webdriver.By.css(BTN_SETTINGS));
        /*
         return this.browser.wait(() => {
         console.log("waiting");
         return this.findElement(BTN_SETTINGS).isDisplayed().then((val) => {
         console.log("INNER " + val) ;
         return val;
         })
         }, 1000);
         */
    }
}
