import Pixels from './image/pixels';

window.bot = {
    analyse: function () {
        //this.getPixels();
        return { x: 0, y: 0}
    },

    getPixels: function () {
        let canvas = document.querySelector('#canvas'),
            data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;

        let nda = {
            data: data, /*data.reduce(function (newArr, value, index) {
                if (index % 4 === 0) {
                    newArr.push(value);
                }
                return newArr;
            }, []), */
            shape: [canvas.width, canvas.height, 4],
            stride: [4, 4 * canvas.width, 1],
            offset: 0
        };

        let entities = new Pixels().process(nda);

        return nda;
    }
};
