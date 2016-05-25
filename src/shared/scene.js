export default class Scene {
    constructor() {
    }

    *iterator() {
        yield this._shapes;
    }

    update(pixels) {

    }
}
