var Victor = require('victor'),
    numeric = require('numeric');

function Circle() {
    this.points = [];
    this.error = 0;
}

Circle.prototype.addPoint = function (p) {
    this.points.push(p);

    return this;
};

Circle.prototype.addPoints = function (ps) {
    this.points = ps;

    return this;
};

Circle.prototype.compute = function () {
    //algorithms[(this.points.length > 3 ? 'multiPoints' : 'threePoints')].call(this);
    algorithms.multiPoints.call(this);

    return this;
};

Circle.prototype.vec = function () {
    return new Victor(this.cx, this.cy);
};

Circle.prototype.surface = function () {
    return Math.PI * Math.pow(this.r, 2);
};

var algorithms = {
    threePoints: function (recursive) {
        var p1 = this.points[0], p2 = this.points[1], p3 = this.points[2];

        var mr = (p2.y - p1.y) / (p2.x - p1.x);
        var mt = (p3.y - p2.y) / (p3.x - p2.x);

        if (mr === mt) { // Not on 1 circle!
            this.radius = null;
        } else {
            var x = (mr * mt * (p3.y - p1.y) + mr * (p2.x + p3.x) - mt * (p1.x + p2.x)) / (2 * (mr - mt));
            var y = (p1.y + p2.y) / 2 - (x - (p1.x + p2.x) / 2) / mr;

            this.r = Math.sqrt(Math.pow((p2.x - x), 2) + Math.pow((p2.y - y), 2));
            this.cx = x;
            this.cy = y;

            if (recursive !== false && (isNaN(x) || isNaN(y))) {
                // The order of points is important!!
                this.points[1] = p3;
                this.points[2] = p2;
                return this.compute(false);
            }
        }
    },
    multiPoints: function () {
        var AT, Aa, ba, a, be, i, A = [], b = [];
        this.points.forEach(function (p) {
            A.push([p.x, p.y, 1]);
            b.push(-Math.pow(p.x,2) - Math.pow(p.y,2));
        });

        AT = numeric.transpose(A);
        Aa = numeric.dot(AT, A);
        ba = numeric.dot(AT, b);
        a = numeric.solve(Aa, ba);

        this.cx = Math.round(-.5*a[0]);
        this.cy = Math.round(-.5*a[1]);
        this.radius = Math.sqrt((a[0]*a[0]+ a[1]*a[1])/4-a[2]);


        // Calculate error
        be = numeric.dot(A, a);
        for( i = 0; i < be.length;i++) {
            this.error += Math.pow((be[i] - b[i]), 2);
        }
        this.error /= b.length;
    }
};

exports.Circle = Circle;
