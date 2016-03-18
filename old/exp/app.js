import {mock} from 'mocktail';
import R from './random';

class App {
    constructor() {
        this.r = new R();
    }

    get(items = 2) {
        let total = 0;
        for( let i = 0; i < items; i++) {
            total += this.r.get();
        }

        return total;
    }
}

export default mock(App);
