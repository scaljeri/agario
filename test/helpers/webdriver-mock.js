class Element {
    constructor() {
        this._size = { height: 0 };
    }

    get selector() {
        return this._selector;
    }

    set selector(selector) {
        this._selector = selector;
    }

    setSize(size) {
        this._size = { height: size };
    }

    // Official API
    getSize() {
        return {
            then: (cb) => cb(this._size)
        };
    }
}

class Webdriver {
    constructor() {
        this._by = {
            css: (cls) => cls
        };
    }
    get By() {
        return this._by;
    }
    resolve(el) {}
    reject(err) {}
}

class Browser {
    constructor(element) {
        this._element = element;
    }

    findElement(selector) {
        this._element.selector = selector;

        return {
            then: (cb) => cb(this._element)
        };
    }
}

export { Webdriver, Browser, Element };
