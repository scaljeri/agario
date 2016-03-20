import fs from 'fs';
import ndarray from 'ndarray';
import savePixels from 'save-pixels';

export default class Agario {
    constructor(page, onlySnapshots) {
        this.page = page;
    }

    setup() {
        return this.page.gotoSettings()
            .then(::this.page.setSkins)
            .then(::this.page.setColors)
            .then(::this.page.setTheme)
            .then(::this.page.setNames)
            .then(::this.page.setMass)
            .then(::this.page.setStats)
            .then(() => {
               console.log('done');
            });
    }

    play() {
        this.page.start().then(() => {
            this.page.getMouseCoords().then((coords) => {
                this.page.moveMouse(coords);
            });

            /*
             setTimeout(() => {
             /*
             this.page.getPixelArray().then((pixels) => {
             pixels.data = pixels.data.reduce((l, v) => {
             l.push(v);
             l.push(v);
             l.push(v);
             l.push(255);

             return l;
             }, []);

             let nda = ndarray(pixels.data, pixels.shape, pixels.stride, pixels.offset);

             let myFile = fs.createWriteStream("n.png");
             let image = savePixels(nda, "png").pipe(myFile);
             });
             }, 1000);
             */
        });
    }
}
