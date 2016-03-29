let singleton;
let singletonEnforcer = Symbol();
let callbacks, counter, fps;

const FPS = 10;

/*
 * This class is a singleton and responsible for repeating tasks (FPS)
 * A task can be
 *   - executed each frame
 *   - skip frames
 *   - stop the execution chain (tasks with an equal or lower prio can be skipped)
 */
export default class Ticker {
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) throw Error('Cannot construct singleton');

        this.reset();
    }

    /**
     * Returns the singleton instance
     *
     * @returns {Ticker}
     */
    static getInstance() {
        if (!singleton) {
            singleton = new Ticker(singletonEnforcer);
        }

        return singleton;
    }

    /**
     * Reset the instance state
     *
     * @returns {Ticker}
     */
    reset() {
        fps = FPS;
        callbacks = {};
        counter = 0;

        return this;
    }

    /**
     * Retrieve the frames per second value
     *
     * @returns {Number}
     */
    get fps() {
        return fps;
    }

    /**
     *
     * @param {Number} input - Frames per second
     */
    set fps(input) {
        if (!isNaN(parseFloat(input)) && isFinite(input)) {
            fps = input;
        }
    }

    /**
     * Register a callback. Each frame the callback functions are executed
     * in the order of their priority, terminal setting or insertion order.
     *
     * @param {String} key - Identifier
     * @param {Function} callback - The callback function
     * @param {Object} [options] - Optional settings
     * @param {Boolean} [options.terminal=false] - Skip all callbacks with same or lower priority
     * @param {Number} [options.skip=0] - Number of frames to skip after execution
     * @param {Number} [options.priority=1] - The priority of the callback (influences the order of callback execution)
     *
     * @returns {Ticker}
     */
    on(key, callback, options = {skip: 0, terminal: false, priority: 1}) {
        if (options.skip === undefined) {
            options.skip = 0;
        }

        if (options.priority === undefined) {
            options.priority = 1;
        }

        callbacks[key] = {callback, options};

        return this;
    }

    /**
     * Remove the callback
     *
     * @param {Sting} key - indetifier
     * @returns {Ticker}
     */
    off(key) {
        delete callbacks[key];

        return this;
    }

    start() {
        if (!this.promise) {
            this.counter = 0;

            this.promise = Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        }

        if (!this.isBusy) {
            let startTime = Date.now();

            this.tick().then(() => {
                // Prepare next tick
                let diff = Date.now() - startTime,
                    fdrops = Math.floor(diff / 100);

                this.id = setTimeout(::this.start, fdrops > 0 ? 0 : (1000 - (100 % diff)) / fps);
            });
        }

        return this.promise;
    }

    stop() {
        cancelTimeout(this.timeoutId);
        this.isBusy = false;

        // TODO: Create stats etc ....

        this.resolve();

        return this;
    }


    tick() {
        this.isBusy = true;

        let keys = Object.keys(callbacks).sort((a, b) => {
            let optA = callbacks[a].options,
                optB = callbacks[b].options;

            // Sort first on `priority` and second on `terminal`
            return optA.priority > optB.priority ? -1 :
                optB.priority > optA.priority ? 1 :
                    (optA.terminal ? -1 : (optB.terminal ? 1 : 0));
        });

        let terminal = false,
            callables = keys.filter((key) => {
                let retVal = false;

                if (!terminal && counter % (callbacks[key].options.skip + 1) === 0) {
                    terminal = callbacks[key].options.terminal;

                    retVal = true;
                }

                return retVal;
            });

        return Promise.all(callables.map((key) => {
            let obj = callbacks[key];

            return counter % (obj.options.skip + 1) === 0 ? obj.callback() : Promise.resolve();
        })).then(() => {
            counter++;
            this.isBusy = false;
        })
    }
}
