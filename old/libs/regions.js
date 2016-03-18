var Victor = require('victor'),
    Shape  = require('./shape').Shape,
    Circle = require('./circle').Circle;

function Regions(width, height, data) {
    this.regions = [];
    this.width = width;
    this.height = height;
    this.data = data;
    this.shape = new Shape(data, width, height);
}

Regions.prototype.remove = function (x, y) {
    var index = this.findRegion(x, y) ;
    if (index > -1) {
        return this.regions.splice(index, 1)[0];
    }
};

Regions.prototype.add = function (x, y) {
    var given = new Victor(x,y);
    if (this.findRegion(given) === -1) {
        // New Region
        var region = this.shape.analyse(x, y);

        if (region) {
            this.regions.push(region);
        }

        /*
         var r = parseInt(Math.random() * 255);
         var g = parseInt(Math.random() * 255);
         var b = parseInt(Math.random() * 255);
         */

        //this.paintRegion(this.regions.length - 1, r, g, b);
    }
};

Regions.prototype.findRegion = function (v) {
    for (var i = 0; i < this.regions.length; i++) {
        var r = this.regions[i];
        if (r.center.distance(v) < r.radius) {
            return i;
        }
    }

    return -1;
};

Regions.prototype.get = function (index) {
    return this.regions[index];
};

Regions.prototype.paintRegions = function () {

    this.regions.forEach(function (region) {
        var r, g,b;
        if (region.isVirus) {
            r  = 90;
            g = 10;
            b = 90;
        } else {
            r  = 0;
            g = 255;
            b = 0;
        }

        this.paintRegion(region, r, g, b);
    }.bind(this));
};

Regions.prototype.paintRegion = function (index, r, g, b) {
    var region;
    if (index === undefined) {
        return ;
    }

    if (isNaN(parseInt(index))) {
        region = index;
    } else {
        region = this.regions[index];
    }

    console.log('paintRegion: total=' + this.regions.length + ' idex=' + index);
    var startX = Math.max(0, region.center.x - region.radius),
        startY = Math.max(0, region.center.y - region.radius),
        endX = Math.min(this.width, region.center.x + region.radius),
        endY = Math.min(this.height, region.center.y + region.radius);

   for(var y = startY; y <=endY; y++) {
        for(var x = startX; x <=endX; x++) {
            if (region.center.distance(new Victor(x, y)) < region.radius) {
                var idx = (this.width * y + x) << 2;
                this.data[idx] = r; //243;
                this.data[idx + 1] = g; //16;
                this.data[idx + 2] = b; //16;
            }
        }
    }
};

exports.Regions = Regions;
