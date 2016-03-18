var Vector = require('victor');

function find(me, regions) {
    var vec, direction = new Vector(0,0);
    if (me) {
        var out = attachClosest(me, regions);
        console.log('=======');
        console.log(out);
        return out;
    }

    return {};



    /*
    regions.forEach(function (region) {
        vec = me.center.clone().subtract(region.center).normalize();

        // Apply some rules
        var weight = region.size / me.center.distance(region.center);
        if (region.size > me.size * 1.1 ) {
            vec = new Vector(-vec.x * weight*10, -vec.y * weight*10);
            direction.add(vec);
        } else if (!region.isVirus) {
            if (region.size/5 > me.size) {
                weight /= 200;
            }
            vec = new Vector(vec.x * weight, vec.y * weight);
            //direction.add(vec);
        } else if (region.size <= me.size) {  // Virus is smaller!!
            //weight /= Math.pow(me.center.distance(region.center));
            vec = new Vector(vec.x * weight, vec.y * weight);
            direction.add(vec);
        }
    });
    return direction.norm();
    */
}

function attachClosest(me, regions) {
    var  attach, minDistance = 0;

    console.log(me.center);
    regions.forEach(function (r) {
        var d = me.center.distance(r.center);
        if (d !== 0 && r.size < (me.size * 1.1) && (minDistance === 0 || d < minDistance)) {
            minDistance = d;
            attach = r;
            console.log(attach.center);
        }
    });

    return attach.center;
}

exports.find = find;