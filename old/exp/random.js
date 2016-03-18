import {mock} from 'mocktail';

class MyRandom {
    constructor(num = 10) {
       this.num = num;
    }

    get() {
        return parseInt(Math.random() * this.num);
    }
}

export default mock(MyRandom);