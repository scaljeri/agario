import Screen from './screen';

(function (ns) {
    let screen = new Screen();

    ns.takeScreenshot = (stride = 1) => {
        return screen.takeScreenshot(stride);
    };

})(window.agarioDriver = {});
