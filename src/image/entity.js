import Victor from 'victor';

export default class {
    constructor(center, radius, size, type) {
        this.center = center;
        this.radius = radius;
        this.size = size;
        this.type = type;
    }

    isInside(x, y) {
        return this.center.distance(new Victor(x, y)) < this.radius;
    }
}
