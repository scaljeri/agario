#!/usr/local/bin/node

var parseImage = require('./libs/detect').parse;

parseImage('test-screenshots/cluster.png').then(function (advice) {
    console.log(JSON.stringify(advice));
});

