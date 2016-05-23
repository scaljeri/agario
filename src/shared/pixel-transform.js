export default class PixelTransform {
    constructor(shapeFactory) {
        this._shapeFactory = shapeFactory;
        this._shapes = [];
    }

    reset() {
        this._shapes = [];
    }

    toShapes(pixels, useDiff = true) {
        //
    }
}
