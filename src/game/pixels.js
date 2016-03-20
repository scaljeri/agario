import fs from 'fs';
import ndarray from 'ndarray';
import savePixels from 'save-pixels';

export default class Pixels {
    constructor(directory) {
        this.directory = directory;
    }

    save(pixels) {
        // Produce R -> RGBA
        let data = [];

        pixels.data.forEach((r) => {
            data.push(r);    // R (given)
            data.push(r);    // G
            data.push(r);    // B
            data.push(255);  // A
        });

        let nda = ndarray(data, pixels.shape, pixels.stride, pixels.offset);

        let myFile = fs.createWriteStream(`${this.directory}/${this.filename()}`);
        savePixels(nda, "png").pipe(myFile);
    }

    filename() {
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            text = '';

        for (var i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return `${text}.png`;
    }
}
