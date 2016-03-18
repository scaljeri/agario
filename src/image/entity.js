import circle from './src/image/circle';

export default class {
    constructor(center, radius, size, type) {
        this.center = center;
        this.radius = radius;
        this.size = size;
        this.type = type;
    }

    isInside(point) {
        return this.center.distance(point) < this.radius;
    }
}
