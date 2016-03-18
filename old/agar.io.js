#!/usr/local/bin/node


"use strict";

var webdriver = require('selenium-webdriver'),
    GamePlay = require('./game-play'),
    Facebook = require('./facebook'),
    Promise = require('promise');

var browser = new webdriver.Builder().usingServer().withCapabilities({
    'browserName': 'chrome',
    'reuse_browser': true
}).build();

var WIDTH = 100;
var HEIGHT = 100;
var facebook = false;
var i = 2;
while (process.argv[i]) {
    if (process.argv[i].match(/facebook/)) {
        facebook = true;
    }

    i++;
}

function setup() {
    Facebook.login(browser, webdriver).then(function () {
        agarioSetup().then(function () {
            browser.manage().window().setSize(WIDTH, HEIGHT)
                .then(play);
        })
    });
}

function agarioSetup() {
    return browser.findElement(webdriver.By.css('.btn-settings'))
        .then(function (element) {
            return element.click()
                .then(clickCheckbox.bind(null, 'noSkins', true))
                .then(clickCheckbox.bind(null, 'noColors', true))
                .then(clickCheckbox.bind(null, 'darkTheme', true))
                .then(clickCheckbox.bind(null, 'noNames', true))
                .then(clickCheckbox.bind(null, 'showMass', false))
                .then(clickCheckbox.bind(null, 'skipStats', true))
    });
}

function clickCheckbox(id, toState) {
    var promise = new Promise(function (resolve, reject) {
        browser.findElement(webdriver.By.id(id))
            .then(function (element) {
                element.click().then(function () {
                    element.getAttribute("checked")
                        .then(function (value) {
                            if (!!value !== toState) {
                                element.click().then(resolve);
                            } else {
                                resolve();
                            }
                        });
                })
            });
    });

    return promise;
}

var count = 0;

var game;
function play() {
    // Everything is ready, lets play
    if (!game) {
        game = GamePlay.create(browser, webdriver, !facebook);
    }

    game.start().then(function (duration) {
        count++;
        console.log("DONE in " + duration);
        if (count < 10)
            play();
    });
}

browser.get('http://agar.io').then(setup);
