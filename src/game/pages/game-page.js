import fs from 'fs';
import Base from './base-page';

export default class GamePage extends Base {
    constructor(options) {
        super(options);

        this.as = new webdriver.ActionSequence(browser);
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
        return this.browser.executeScript('return bOt.analyse()');
    }

    takeSnapshot() {
        return this.browser.executeScript('return bOt.takeSnapshot()');
    }

    moveMouse(coords) {
        this.browser.findElement(this.webdriver.By.css(CANVAS))
            .then((canvas) => {
                this.as.mouseMove(canvas, coords).click().perform();
            });
    }
}
