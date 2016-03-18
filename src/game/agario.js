const SETTINGS_CLS = '.btn-settings';

export default class Agario {
    constructor(page) {
        this.page = page;
    }

    setup() {
        return this.page.getByCls(SETTINGS_CLS)
            .then((element) => {
                return element.click()
                    .then(::this.page.setSkins())
                    .then(::this.page.setColors())
                    .then(::this.page.setTheme())
                    .then(::this.page.setNames())
                    .then(::this.page.setMass())
                    .then(::this.page.setStats())
            });
    }

    play() {
        return this.page.start()
            .then(() => {

            });
    }
}
