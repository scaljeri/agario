import fs from 'fs';
import ndarray from 'ndarray';
import savePixels from 'save-pixels';

import Pixels from '../shared/pixels';

export default class Image extends Pixels {
    constructor(outputDir) {
        super();

        this._directory = outputDir;
    }

    save() {
        let fileStream,
            filename = this.filename(),
            nda = this.ndarray(4);

        nda = ndarray(nda.data, nda.shape, nda.stride, nda.offset);

        fileStream = fs.createWriteStream(`${this._directory}/${filename}`);
        savePixels(nda, "png").pipe(fileStream);

        return filename;
    }

    filename() {
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            text = '';

        for (let i = 0; i < 5; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return `${text}.png`;
    }
}
