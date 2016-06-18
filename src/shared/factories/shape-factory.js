export default class ShapeFactory {
    constructor(cellFactory, virusFactory, foodFactory) {
        this._Cell = cellFactory;
        this._Virus = virusFactory;
        this._Food = foodFactory;
    }

    create() {
        return this._di.getInstance(type);
    }
}
