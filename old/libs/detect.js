var PNG = require('pngjs').PNG,
    Regions = require('./regions').Regions,
    Victor = require('Victor'),
    direction = require('./direction'),
    Promise = require('promise');


function parse(data, width, height, debug) {
    var isInsideRegion = false,
        regions = new Regions(width, height, data);

    var isInMiddle = true;
    for (y = 5; y < height - 70; y++) {
        for (x = 5; x < width - 5; x++) {
            var idx = (width * y + x) << 2;

            if (data[idx] > 200) {
                if (!isInsideRegion) {
                    if (isInMiddle) {
                        while (data[idx] >= 200 && x < width) {
                            idx = (width * y + (++x)) << 2;
                        }

                        if (isInMiddle) {
                            idx = (width * y + (--x)) << 2;
                        }

                        if (data[idx] > 200) {
                            isInMiddle = false;
                            regions.add(x, y);
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

    var me = regions.remove(new Victor(parseInt(width / 2), parseInt(height / 2)));
    var coordinates = direction.find(me, regions.regions);
    console.log('continie ', me);

    if (me) {
        var a = (me.center.y - coordinates.y) / (me.center.x - coordinates.x); // rico
        var b = (me.center.y - a * me.center.x);

        if (debug) {
            regions.paintRegions();
            regions.paintRegion(me, 62, 92, 77); // Yellow


            drawYDirection(me, coordinates, data, a, b, width);

            /*
             var count = 0, x, y, idx;
             while (count < 100) {
             idx = (width * parseInt(me.center.y + count * advice.y) + parseInt(me.center.x + advice.x * count)) << 2;
             data[idx] = 255;
             data[idx + 1] = 0;
             data[idx + 2] = 0;
             count++;
             }
             */
        }

        var incr = 10;
        if (Math.abs(coordinates.x - me.center.x) > Math.abs(coordinates.y - me.center.y)) {
            if (coordinates.x > me.center.x) {
                return {x: me.center.x + incr, y: a * (me.center.x + incr) + b};
            } else {
                return {x: me.center.x - incr, y: a * (me.center.x - incr) + b};
            }
        } else {
            if (coordinates.y > me.center.y) {
                return {x: (me.center.y + incr) / a - b, y: me.center.y + incr};
            } else {
                return {x: (me.center.y - incr) / a - b, y: me.center.y};
            }
        }
        //return !me ?  undefined : me.center.add(advice.multiplyScalar(100));
        //return '{"x":' + (me.center.x + advice.x * 100) + ',"y":' + (me.center.y + advice.y * 100) + '}';
        console.log(coordinates);
    }
}
function drawXDirection(me, coordinates, data, a, b, width) {
    var idx, x = parseInt(coordinates.x), y = parseInt(coordinates.y);

    console.log(me);
    while (x !== me.center.x) {
        idx = (width * parseInt(y) + parseInt(x)) << 2;
        data[idx] = 255;
        data[idx + 1] = 0;
        data[idx + 2] = 0;

        x +=  me.center.x > coordinates.x ?  1 : -1;
        y = a * x + b;
        console.log(x + ' ' + y);
    }
}

function drawYDirection(me, coordinates, data, a, b, width) {
    var idx, x = parseInt(coordinates.x), y = parseInt(coordinates.y);

    console.log(me);
    console.log(coordinates);
    while (y !== me.center.y) {
        idx = (width * parseInt(y) + parseInt(x)) << 2;
        data[idx] = 255;
        data[idx + 1] = 0;
        data[idx + 2] = 0;

        y += me.center.y > coordinates.y ? 1 : -1;
        x = (y - b)/a;
        console.log(x + ' ' + y);
    }

}

exports.parse = parse;
