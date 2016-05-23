export default class Play {
    constructor(screen, heartbeat, bot, pixelTransform) {
        this._bot = bot;
        this._heartbeat = heartbeat;
        this._pixelTransform = pixelTransfrom;
        this._screen = screen;

        if (!this._bot) {
            throw Error('No bOt defined');
        }

        heartbeat
            .on('move', ::this.move)
            .on('reset', ::this.reset, {skip: 20, priority: 2})
            .start();
    }

    // TODO: Move this into web-worker if possible
    move() {
        let shapes = this.pixelTransfrom(this._screen.getPixelArray()),
            coordinates = this._bot.analyse(shapes);

        this._screen.moveBot(coordinates);
    }

    reset() {
        this._pixelTransform.reset();
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
}
