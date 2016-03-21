let singleton;
let singletonEnforcer = Symbol();

const FPS = 10;

export default class Ticker {
    constructor(enforcer) {
        if(enforcer !== singletonEnforcer) throw "Cannot construct singleton";

        this.fps = FPS;
        this.cbs = [];
        this.counter = 0;
    }

    static getInstance() {
        if(!singleton) {
            singleton = new Engine(singletonEnforcer);
        }

        return singleton;
    }

    setFPS(fps) {
        this.fps = fps || this.fps;

        return this;
    }

    on(key, callback, skipTicks = 1) {
        this.cbs.push({ key, callback, skipTicks });

        return this;
    }

    off(key) {
        // TODO
    }

    start() {
        if (!this.isTicking) {
            this.isTicking = true;
            this.tick();
        }
    }

    stop() {
        cancelTimeout(this.id);
        this.isTicking = false;

        // TODO: Create stats etc ....

        this.counter = 0;
    }


    tick() {
        this.counter ++;

        if (this.isTicking) {
            let startTime = Date.now();

            Promise.all(this.cbs.map((obj) => {
                return this.counter % obj.skipTimes === 0 ?  obj.callback() : Promise.resolve();
            })).then(() => {
                if (this.isTicking) {
                    let diff = Date.now() - startTime,
                        fdrops = Math.floor(diff / 100);

                    if (fdrops > 0) {
                        console.log(`WARNING: ${fdrops} frame${fdrops === 1 ? '' : 's'} dropped`);
                    }

                    // Prepare next tick
                    this.id = setTimeout(::this.tick, fdrops > 0 ? 0 : (1000 - (100 % diff))/this.fps);
                }
            });
        }
    }

}
