var Victor = require('victor');
var Circle = require('./circle').Circle;
var isVirus = require('./virus').isVirus;

var THRESHOLD = 200;

function Shape(data, w, h) {
    this.d = data;
    this.w = w;
    this.h = h;
    this.points = [];
    this.maxPoints = 10000;
}

Shape.prototype.analyse = function (x, y) {
    this.points = [{x: x, y: y}];
    this.trace(x, y);

    if (this.points.length > 1) {
        var circle = new Circle()
            .addPoints(this.points)
            .compute();

        return {
            center: new Victor(parseInt(circle.cx), parseInt(circle.cy)),
            error: circle.error,
            isVirus: isVirus(this.points, circle),
            radius: parseInt(circle.radius) + 7,
            size: Math.PI * Math.pow(circle.radius, 2)
        }
    } else {
        return null;
    }
};

Shape.prototype.trace = function (x, y) {
    var idx, origIdx = (this.w * y + x) << 2;

    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i !== j || i !== 0) {
                idx = (this.w * (y + j) + x + i) << 2;

                if (this.d[idx] !== 0 && y > 0 && x > 0 && x < this.w - 5) { // Make sure its a new point
                    if (this.d[origIdx] === 0 && this.d[idx] < THRESHOLD) {
                        this.d[idx] = 90;
                        this.d[idx + 1] = 10;
                        this.d[idx + 2] = 90;
                        if (this.trace(x + i, y + j)) {
                            return true;
                        }
                    } else if (this.d[origIdx] !== 0 && this.d[idx] >= THRESHOLD) {
                        this.d[idx] = this.d[idx + 2] = 0;
                        this.d[idx + 1] = 255;
                        this.points.push({x: x + i, y: y + j});

                        if (x < 1 || y < 1 || this.w < x + 1 || this.h < y + 1) {
                            return false;
                        }

                        if (this.points.length >= this.maxPoints) {
                            return true;
                        } else {
                            if (this.trace(x + i, y + j)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    return false;
};

exports.Shape = Shape;
