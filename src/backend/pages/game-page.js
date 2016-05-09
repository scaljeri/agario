import fs from 'fs';
import Base from './base-page';

const BTN_FB = '.btn-play',
    BTN_GUEST = '.btn-play-guest',
    NS = 'agarioDriver';

export default class GamePage extends Base {
    constructor(options) {
        super(options);

        this.as = new this.webdriver.ActionSequence(this.browser);
    }

    /**
     * Begin the game. It depends on the `options.isGuest` to determine which play button to click on
     *
     * @returns {Promise}
     */
    start() {
        return this.findElement(this.options.facebook ? BTN_FB : BTN_GUEST)
            .then(
                (element) => {
                    return element.isDisplayed()
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

    remote(func) {
        return this.browser.executeScript(`return ${NS}.${func}()`);/*
            .then((data) => {
                return data;
            });*/
    }

    /*
    getMouseCoords() {
        return this.browser.executeScript('return bOt.analyse()');
    }

    moveMouse(coords) {
        this.browser.findElement(this.webdriver.By.css(CANVAS))
            .then((canvas) => {
                this.as.mouseMove(canvas, coords).click().perform();
            });
    } */
}
