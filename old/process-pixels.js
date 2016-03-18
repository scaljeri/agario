#! /usr/local/bin/node

var parse = require('./libs/detect').parse;
var ndarray = require('ndarray');

fs = require('fs');
var data = fs.readFile('pixels.txt', 'utf8', function (err, data) {
    var input = JSON.parse(data);

    console.log('width=' + input.shape[0]);
    console.log('height=' + input.shape[1]);
    console.log('sample=' + input.data.length);

    var coords = parse(input.data, input.shape[0], input.shape[1], true);
    console.log(coords);

    var nda = ndarray(input.data, input.shape, input.stride, input.offset);
    var savePixels = require("save-pixels");
    var myFile = require('fs').createWriteStream("nn.png");
    var image = savePixels(nda, "png").pipe(myFile);
});
