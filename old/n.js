#! /usr/local/bin/node

var getPixels = require("get-pixels");
var ndarray   = require('ndarray');
var savePixels = require("save-pixels");
var fs = require('fs');


getPixels("test-screenshots/cluster.png", function(err, pixels) {
    if(err) {
        console.log("Bad image path");
        return
    }
    console.log("Shape: ", pixels.shape.slice());
    console.log("Shape: ", pixels.shape);
    console.log(Object.keys(pixels));
    console.log(pixels.data.length);
    console.log('Stride: ', pixels.stride);
    console.log('offset: ', pixels.offset);
    for( var i = 0; i < 20; i ++) {
        console.log(pixels.data[i]);
    }

    console.log("======");
    console.log(pixels.get(0));

    var nda = ndarray(pixels.data, pixels.shape, pixels.stride, pixels.offset);

    var myFile = fs.createWriteStream("n.png");
    var image = savePixels(nda, "png").pipe(myFile);

    var myFile = fs.createWriteStream("o.png");
    var image = savePixels(pixels, "png").pipe(myFile);
});

/*
console.log('------');
var arr = [0,1,2,3,4,10,11,12,13,14,20,21,22,23,24,30,31,32,33,34];
var stride = 5;

function sumIt(arr, startRow, endRow, startCol, endCol, stride) {
    var sum = 0;
    for(var i = startRow; i <= endRow; i++) {
        for (var j = startCol; j < endCol; j++) {
            var val = arr[i*stride + j];
            console.log(val);
            sum += val;
        }

    }

    return sum;
}

console.log(sumIt(arr, 1, 2, 1, 3, 5));
console.log('=======');

var fs = require('fs'),
    PNG = require('pngjs').PNG;

fs.createReadStream('test-screenshots/cluster.png')
    .pipe(new PNG({
        filterType: 4
    }))
    .on('parsed', function() {
        for( var i = 0; i < 20; i ++) {
            console.log(this.data[i]);
        }

    });
    */
