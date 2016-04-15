export default class Play {
    constructor(screen, heartbeat, bot) {
        this._screen = screen;
        this._heartbeat = heartbeat;
        this._bot = bot;

        if (!this._bot) {
            throw Error('No bOt defined');
        }

        heartbeat
            .on('bot', ::this.move)
            .on('reset', ::this.reset, {skip: 20, priority: 2})
            .start();
    }

    stop() {
        // ????
    }

    start() {
        // analyse pixels
        // send scene (not pixels) to bot
        // translate result to mouse coordinates
        // move mouse
    }

    reset() {
        // reset memorized pixels
    }
}
