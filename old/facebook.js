var Promise = require('promise'),
    fs = require('fs'),
    credentials;


fs.readFile('./credentials.txt', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    credentials = JSON.parse(data);
});

exports.login = function (browser, webdriver) {
    function fBlogin() {
        var promise = new Promise(function (resolve, reject) {
            canLogin(function (element) {
                element.click().then(function () {
                    activateFacebookPopup(function (origHandle) {
                        enterCredentials(function () {
                            submitForm(origHandle, resolve);
                        });
                    });
                })
            }, reject);
        });

        return promise;
    }

    function submitForm(origHandle, resolve) {
        browser.findElement(webdriver.By.css('#loginbutton')).then(function (element) {
            element.click().then(function () {
                browser.switchTo().window(origHandle).then(resolve);
            })
        });
    }

    function enterCredentials(resolve) {
        browser.findElement(webdriver.By.css('#loginform [name=email]')).then(function (element) {
            element.sendKeys(credentials.username).then(function () {
                browser.findElement(webdriver.By.css('#loginform [name=pass]')).then(function (element) {
                    element.sendKeys(credentials.password).then(resolve);
                });
            });
        });
    }

    function activateFacebookPopup(resolve) {
        browser.findElement(webdriver.By.css('.btn-fb')).click().then(function () {
            browser.getAllWindowHandles().then(function (handles) {
                browser.switchTo().window(handles[1]).then(function () {
                    resolve(handles[0]);
                });
            });
        });
    }

    function canLogin(resolve, reject) {
        browser.findElement(webdriver.By.css('.btn-login-play')).then(function (element) {
            element.getSize().then(function (size) {
                if (size.height > 0) {
                    resolve(element);
                } else {
                    reject();
                }
            });
        });
    }

    return new Promise(function (resolve, reject) {
        fBlogin().then(resolve, reject);
    });
}
