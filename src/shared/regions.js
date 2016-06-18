export default class Regions {
    constructor(circleFactory) {
        this._circleFactory = circleFactory;
        this._regions = [];
    }

    get regions() {
        return this._regions;
    }

    reset() {
        this._regions = [];
    }

    create(x, y, pixels) {
        if (!this.find(x, y)) {
            this._shapes
        }
    }

    find(x, y) {
        return !!this._regions.find((region) => {
            return region.isInside(x, y)   
        });
    }

}
