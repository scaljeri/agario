import Victor from 'victor';
import numeric from 'numeric';

const THRESHOLD = 100,
    MAX_POINTS = 1000;


/** This class represents a cricle */
export default class Circle {
    constructor(x, y, nda) {
        this.points = [];

        this.trace(x, y, nda);
        this.determine();
    }

    trace(x, y, nda) {
        let height = nda.shape[1],
            width = nda.shape[0],
            origIdx = (width * y + x),
            idx;

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i !== j || i !== 0) {
                    idx = (width * (y + j) + x + i) << 2;

                    if (nda.data[idx] !== 0 && y > 0 && x > 0 && x < width - 5) { // Make sure its a new point
                        if (nda.data[origIdx] === 0 && nda.data[idx] < THRESHOLD) {
                            nda.data[idx] = 90;
                            nda.data[idx + 1] = 10;
                            nda.data[idx + 2] = 90;
                            if (this.trace(x + i, y + j, nda)) {
                                return true;
                            }
                        } else if (nda.data[origIdx] !== 0 && nda.data[idx] >= THRESHOLD) {
                            nda.data[idx] = nda.data[idx + 2] = 0;
                            nda.data[idx + 1] = 255;
                            this.points.push({x: x + i, y: y + j});

                            if (x < 1 || y < 1 || width < x + 1 || height < y + 1) {
                                return false;
                            }

                            if (this.points.length >= MAX_POINTS) {
                                return true;
                            } else {
                                if (this.trace(x + i, y + j, nda)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }

        return false;
    }

    determine() {
        var AT, Aa, ba, a, be, i, A = [], b = [];
        this.points.forEach(function (p) {
            A.push([p.x, p.y, 1]);
            b.push(-Math.pow(p.x, 2) - Math.pow(p.y, 2));
        });

        AT = numeric.transpose(A);
        Aa = numeric.dot(AT, A);
        ba = numeric.dot(AT, b);
        a = numeric.solve(Aa, ba);

        this.cx = Math.round(-.5 * a[0]);
        this.cy = Math.round(-.5 * a[1]);
        this.center = new Victor(this.cx, this.cy);
        this.radius = Math.sqrt((a[0] * a[0] + a[1] * a[1]) / 4 - a[2]);


        // Calculate error
        be = numeric.dot(A, a);
        for (i = 0; i < be.length; i++) {
            this.error += Math.pow((be[i] - b[i]), 2);
        }
        this.error /= b.length;
    }
}
