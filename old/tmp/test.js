var Promise = require('promise');

var promise = new Promise(function (resolve, reject) {
    console.log('begin');
    setTimeout(function () {
        resolve();
    }, 1000);
}).then(function () {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("p1");
            resolve();
        }, 1000);
    });
    return promise;
}).then(function () {
    var promise = new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("p1");
            resolve();
        }, 1000);
    });

    return promise;
});

console.log("start");
promise.then(function () {
    console.log('done');
});
console.log("main done");
