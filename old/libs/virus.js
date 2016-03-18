exports.isVirus = function (data, circle) {
    var memR = circle.radius;
    var dir = 1;
    var count = 0;
    for (var i = 1; i < data.length; i++) {
        var radius = Math.sqrt(Math.pow(data[i].x - circle.cx, 2) + Math.pow(data[i].y - circle.cy, 2));

        if ((radius - memR) < -2 && dir > 0) {
            count ++;
            memR = radius;
            dir = -1;
        }

        if (radius - memR > 2 && dir < 0) {
            memR = radius;
            count ++;
            dir = 1;
        }
    }

    return count/data.length > 0.005;

};