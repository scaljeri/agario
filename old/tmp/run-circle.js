var Circle = require('../libs/circle').Circle;

var c = new Circle();
//var c = new Circle(Circle.METHODS.THREE_POINTS);

c.addPoint({x: 0, y: 0});
c.addPoint({x: 10, y: 10});
c.addPoint({x: 0, y: 20});
c.addPoint({x: -11, y: 10});
/*
console.log('INPUT: <1,1>, <1,7> and <4,4>');
c.addPoint({x: 1, y: 1});
c.addPoint({x: 4, y: 4});
c.addPoint({x: 1, y: 7});
c.addPoint({x: -3, y: 4});
*/


/*
var x, y, cx = 10, cy = 10, r = 5;
var step = Math.PI/50;
var angle = 0;
for( var i = 0; i < 100; i++) {
    x = cx + r * Math.cos(angle);// + (Math.random() -.5) * 5;
    y = cy + r * Math.sin(angle);// + (Math.random() - .5) * 5;

    c.addPoint({ x: x, y: y});
    console.log(x + ' ' + y);

    angle += step;
}
*/

//c.addPoint({x: -3, y: 4});

//c.addPoint({x: -10, y: 0});
//c.addPoint({x: 0, y: 10});
//c.addPoint({x: 10, y: 0});
//c.addPoint({x: 0, y: -10});

c.compute();

//console.log('CENTER cx=' + c.cx + ' cy=' + c.cy);
//console.log('RADIUS: ' + c.radius);


