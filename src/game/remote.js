window.bOt = {};

(function (ns) {
    function getPixels() {
        let canvas = document.querySelector('#canvas'),
            data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;

        return {
            data: data.reduce(function (newArr, value, index) {
                if (index % 4 === 0) {
                    newArr.push(value);
                }
                return newArr;
            }, []),
            shape: [canvas.width, canvas.height, 4],
            stride: [4, 4 * canvas.width, 1],
            offset: 0
        };
    }

    ns.analyse = function () {
        // getPixels();
        // analyse stuff
        // return coordinates

        return {x: 0, y: 0}
    };

    ns.takeSnapshot = function () {
        return getPixels();
    };
})(window.bOt);
