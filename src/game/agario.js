const SETTINGS_CLS = '.btn-settings';

export default class Agario {
    constructor() {
    }

    setup() {
        return browser.findElement(webdriver.By.css(SETTINGS_CLS))
            .then((element) => {
                return element.click()
                    .then(clickCheckbox.bind(null, 'noSkins', true))
                    .then(clickCheckbox.bind(null, 'noColors', true))
                    .then(clickCheckbox.bind(null, 'darkTheme', true))
                    .then(clickCheckbox.bind(null, 'noNames', true))
                    .then(clickCheckbox.bind(null, 'showMass', false))
                    .then(clickCheckbox.bind(null, 'skipStats', true))
            });
    }

    clickCheckbox(id, toState) {
        return new Promise((resolve, reject) => {
            browser.findElement(webdriver.By.id(id))
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
