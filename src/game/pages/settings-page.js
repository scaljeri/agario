import Base from './base-page';

const SETTINGS = '.btn-settings',
    NO_SKINS = '#noSkins',
    NO_COLORS = '#noColors',
    DARK_THEME = '#darkTheme',
    NO_NAMES = '#noNames',
    SHOW_MASS = '#showMass',
    SKIP_STATS = '#skipStats',
    LOW_RES = "#quality",
    LOW_OPT = "[data-itr=page_graphics_low]";

export default class SettingsPage extends Base {
    constructor() {
        super();
    }

    checkCheckboxes() {
        return this.findElement(SETTINGS).click()
            .then(this.setCheckbox.bind(this, NO_SKINS, true))
            .then(this.setCheckbox.bind(this, NO_COLORS, true))
            .then(this.setCheckbox.bind(this, DARK_THEME, true))
            .then(this.setCheckbox.bind(this, NO_NAMES, true))
            .then(this.setCheckbox.bind(this, SHOW_MASS, false))
            .then(this.setCheckbox.bind(this, SKIP_STATS, true))
            .then(::this.lowResolution)
    }

    setCheckbox(css, state) {
        return this.findElement(css)
            .then((element) => {
                // Always check a checkbox first, because sometimes default checked-state gets ignored
                console.lo
                return element.click()
                    .then(() => {
                        return element.getAttribute("checked")
                    })
                    .then((isSelected) => {
                        if (!!isSelected !== state) { // isSelected is null or 'true'
                            return element.click();
                        } else {
                            this.webdriver.promise.when();
                        }
                    })
            });
    }

    lowResolution() {
        return this.findElement(LOW_RES).click()
            .then(() => {
                return this.findElement(LOW_OPT).click();
            });
    }
}
