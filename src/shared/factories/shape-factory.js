export default class ShapeFactory {
    constructor(di) {
        this._di = di;
    }

    getInstance(type) {
        return this._di.getInstance(type);
    }
}
