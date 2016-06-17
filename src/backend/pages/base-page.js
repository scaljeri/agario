import webdriver from 'selenium-webdriver';
import chrome  from 'selenium-webdriver/chrome';

let browser;

export default class BasePage {
    static get browser() {
        if (!browser) {
            // The options below are needed to prevent the following security error:
            //    Failed tp execute 'getImageData' on CanvasRenderingContext2D:
            //    The canvas has been tainted by cross-origin data.
            let options = new chrome.Options();
            options.addArguments(['--disable-web-security', '--user-data-dir']);

            browser = new webdriver.Builder().withCapabilities(options.toCapabilities()).build();
        }

        return browser;
    }


    constructor(options) {
        this.options = options;
        this.webdriver = webdriver;
        this.browser = BasePage.browser;
    }

    waitFor(css, timeout = 3000) {
        return browser.wait(() => {
            return browser.isElementPresent(webdriver.By.css(css))
        }, timeout);
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
                            this.webdriver.promise.when(element);
                        } else {
                            this.webdriver.promise.rejected();
                        }
                    });
            });
        }

        return promise;
    }

    removeElement(css) {
        return this.findElement(css)
            .then((element) => {
                browser.executeScript("arguments[0].parentNode.removeChild(arguments[0]);", element);
            });
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
