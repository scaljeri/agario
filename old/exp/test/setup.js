import {env, ENV, inject} from 'mocktail';
env(ENV.TESTING);

class MyRandomMock {
    constructor() {
        console.log("YE SYESY EYSY");
        this.name = 'MyRandomMock';
    }

    get() {
        return 10;
    }
}

console.log('INJECT');
inject('MyRandom', MyRandomMock);