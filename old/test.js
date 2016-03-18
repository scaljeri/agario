#!/usr/local/bin/node

var PNG = require('pngjs').PNG,
    Regions = require('./libs/regions').Regions,
    Victor = require('Victor'),
    direction = require('./libs/direction');


var images = [], i = 2;
var debug = false;

if (process.argv[2].match(/debug/)) {
    debuger = true;
    i = 3;
}

while (process.argv[i]) {
    images.push(process.argv[i]);
    i++;
}

function parse() {
    images.forEach(function (path) {
        require('fs').createReadStream(path)
            .pipe(new PNG({
                filterType: 4
            }))
            .on('parsed', function () {
                var isInsideRegion = false,
                    regions = new Regions(this.width, this.height, this.data);

                var isInMiddle = true;
                for (y = 5; y < this.height - 70; y++) {
                    for (x = 5; x < this.width - 5; x++) {
                        var idx = (this.width * y + x) << 2;

                        if (this.data[idx] > 200) {
                            if (!isInsideRegion) {
                                if (isInMiddle) {
                                    while (this.data[idx] >= 200 && x < this.width) {

                                        /*
                                         if (this.data[idx] > 200) {
                                         this.data[idx] = 201;
                                         this.data[idx + 1] = 201;
                                         this.data[idx + 2] = 201;
                                         }
                                         */
                                        idx = (this.width * y + (++x)) << 2;
                                    }

                                    if (isInMiddle) {
                                        idx = (this.width * y + (--x)) << 2;
                                        //this.data[idx] = 0;
                                        //this.data[idx + 1] = 255;
                                        //this.data[idx + 2] = 0;
                                        //regions.add(x, y);
                                        //this.pack().pipe(require('fs').createWriteStream(imagePath + '-parsed.png'));
                                        //return;
                                    }

                                    if (this.data[idx] > 200) {
                                        isInMiddle = false;
                                        regions.add(x, y);
                                        //this.pack().pipe(require('fs').createWriteStream(imagePath + '-parsed.png'));
                                        //return;
                                    }
                                } else {
                                    isInsideRegion = true;
                                    regions.add(x, y);
                                }
                            }
                        } else {
                            isInMiddle = false;
                            isInsideRegion = false;
                        }

                        if (y === -10) {
                            d[idx] = 243;
                            d[idx + 1] = 16;
                            d[idx + 2] = 16;
                        }
                    }
                }

                var me = regions.remove(new Victor(parseInt(this.width / 2), parseInt(this.height / 2)));
                var advice = direction.find(me, regions.regions);

                if (debug) {
                    regions.paintRegions();
                    regions.paintRegion(me, 62, 92, 77); // Yellow

                    var count = 0, x, y, idx;

                    while (count < 100) {
                        idx = (this.width * parseInt(me.center.y + count * advice.y) + parseInt(me.center.x + advice.x * count)) << 2;
                        this.data[idx] = 255;
                        this.data[idx + 1] = 0;
                        this.data[idx + 2] = 0;
                        count++;
                    }

                    this.pack().pipe(require('fs').createWriteStream(path + '-parsed.png'));
                }

                console.log('{"x":' + (me.center.x + advice.x * 100) + ',"y":' + (me.center.y + advice.y * 100) + '}');


            });
    });
}

exports.process = parse;



