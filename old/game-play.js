var Promise = require('promise'),
    sys = require('sys'),
    exec = require('child_process').exec,
    parse = require('./libs/detect').parse,
    ndarray = require('ndarray');

function Game(browser, webdriver, isGuest) {
    this.browser = browser;
    this.webdriver = webdriver;
    this.duration = 30;
    this.isGuest = isGuest;
}


function makeFilename() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

Game.prototype.isExpired = function () {
    return (Date.now() - this._startTime) / 1000 > this.duration;
};

Game.prototype.ready = function () {
    var self = this;

    var promise = new Promise(function (resolve, reject) {
        console.log("isGuest: " + self.isGuest);
        //self.browser.findElement(self.webdriver.By.css(self.isGuest ? '.btn-play-guest' : '.btn-play')).then(function(element) {
        self.browser.findElement(self.webdriver.By.css('.btn-play')).then(function (element) {
            element.getSize().then(function (size) {
                console.log("IS ELEMENT VISIBLE ? " + size.height);
                if (size.height > 0) {
                    element.click().then(resolve);
                } else {
                    reject();
                }
            });
        }, function (err) {
            console.log("error");
        });
    });
    console.log(promise);

    return promise;
};

Game.prototype.start = function () {
    var self = this;

    var promise = new Promise(function (resolve, reject) {
        self.ready().then(function () {
            // We're playing!!
            console.log('LETS BEGIN');
            self._startTime = Date.now();
            self.gameLoop(resolve, reject);
        }, function (err) {
            console.log('WAITING');
            setTimeout(function () {
                self.start();
            }, 100);
        });
    });

    return promise;
};

Game.prototype.stop = function () {
    return parseInt((Date.now() - this._startTime) / 1000);
};

/*
 Game.prototype.takeScreenshot = function () {
 var self = this;

 var promise = new Promise(function (resolve, reject) {

 self.browser.takeScreenshot().then(
 function (image, err) {
 var filename = './screenshots/' + makeFilename() + '.png';
 require('fs').writeFile(filename, image, 'base64', function (err) {
 reject(err);
 });

 resolve(filename);
 });
 });

 return promise;
 };
 */

Game.prototype.areWeStillPlaying = function () {
    var self = this;

    self.ready().then(function () { // DONE
        self.stop();
    }, function () { // Still playing
        console.log("SETUP getPixels=================");
        self.browser.executeScript('window.getPixels = function () {var c = $("canvas#canvas")[0], data = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; return {data: data.reduce(function (l, v, i) { if (i % 4 === 0){l.push(v);} return l;}, []), width: c.width, height: c.height};}').then (function () {
            gameLoopCount = 0;
            self.gameLoop();
        });
    });
}

var gameLoopCount = 20;
Game.prototype.gameLoop = function (resolve, reject) {
    var self = this;

    if (gameLoopCount === 20) {
        self.areWeStillPlaying();
    } else {
        console.log("VOOR");
        gameLoopCount++;

        var startTime = Date.now();
        //var command = 'var c = $("canvas#canvas")[0], data = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; return {data: data.reduce(function (l, v, i) { if (i % 4 === 0){l.push(v);} return l;}, []), width: c.width, height: c.height};';
        var command = 'return window.getPixels()';

        //var command = 'var c = $("canvas#canvas")[0], data = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; return {data: data, width: c.width, height: c.height};';
        //working calls
        //var command = 'var c = $("canvas#canvas")[0], data = c.getContext("2d").getImageData(0, 0, c.width, c.height).data; return {data: data, shape: [c.width,c.height,4], stride: [4, 4*c.width, 1], offset: 0};';
        console.log(command);
        self.browser.executeScript(command).then(function (output) {
            console.log('EXECUTE SCRIPT IN ' + (Date.now() - startTime));
            var newArr = [];
            for (var i = 0; i < output.data.length; i++) {
                newArr.push(output.data[i]);
                newArr.push(output.data[i]);
                newArr.push(output.data[i]);
                newArr.push(255);
            }
            /*
             console.log(newArr.length);

             // 4, 4*c.width, 1], offset: 0
             var nda = ndarray(newArr, [output.width, output.height, 4], [4, 4 * output.width, 1], 0);
             var savePixels = require("save-pixels");
             var myFile = require('fs').createWriteStream("n.png");
             var image = savePixels(nda, "png").pipe(myFile);
             // ------
             var fs = require('fs');

             var file = fs.createWriteStream('pixels.txt');
             file.on('error', function(err) { / * error handling * / });
             var a = {
             data: newArr,
             shape: [output.width, output.height, 4],
             stride:  [4, 4 * output.width, 1],
             offset: 0
             };
             file.write(JSON.stringify(a));
             file.end();

             */

            console.log('......');
            var direction = parse(newArr, output.width, output.height, false);

            if (direction) {
                console.log('yes yes');
                console.log(direction);

                var coords = {
                    x: parseInt(direction.x),
                    y: parseInt(direction.y)
                };

                var as = new self.webdriver.ActionSequence(self.browser);

                self.browser.findElement(self.webdriver.By.css('#canvas')).then(function (result) {
                    as.mouseMove(result, coords).click().perform();
                    console.log('done in ' + (Date.now() - startTime));
                    self.gameLoop();
                });
            } else {
                setTimeout(function () {
                    self.gameLoop();
                }, 100);
            }

            /*
            var nda = ndarray(newArr, [output.width, output.height, 4], [4, 4 * output.width, 1], 0);
            var savePixels = require("save-pixels");
            var myFile = require('fs').createWriteStream('./screenshots/' + makeFilename() + '.png');
            var image = savePixels(nda, "png").pipe(myFile);
            */
        });
    }
};

exports.create = function (browser, webdriver, isGuest) {
    return new Game(browser, webdriver, isGuest);
};