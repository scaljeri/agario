// npm install numeric
var numeric = require('numeric');

var p = [];
var cx = 12, cy = 13, r = 4;
var step = Math.PI/100;
var angle = 0;
var A = [], b = [];

for( var i = 0; i < 100; i++) {
    x = cx + r * Math.cos(angle);
    y = cy + r * Math.sin(angle);

    p.push({ x: x, y: y});

    angle += step;
}

// Create Matrices
p.forEach(function(i) {
    A.push([i.x, i.y, 1]);
    b.push(-Math.pow(i.x, 2) - Math.pow(i.y, 2));
});

var AT = numeric.transpose(A),
    Aa = numeric.dot(AT, A),
    ba = numeric.dot(AT, b),
    a  = numeric.solve(Aa, ba);

console.log('cx = ' + Math.round(-.5 * a[0]));
console.log('cy = ' + Math.round(-.5 * a[1]));
console.log('radius = ' + Math.sqrt(Math.pow(p[0].x, 2) + Math.pow(p[0].y, 2) + a[2]));
