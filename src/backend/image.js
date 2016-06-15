import Pixels from '../shared/pixels';

export default class Image extends Pixels {
    constructor(fs, ndarray, savePixels, targetDir) {
        super();

        this._fs = fs;
        this._ndarray    = ndarray;
        this._savePixels = savePixels;

        if (targetDir) {
            this._directory = targetDir;
            fs.existsSync(targetDir) || fs.mkdirSync(targetDir);
        }
    }

    save(filename) {
        let fileStream,
            nda = this.ndarray(4);

        filename = filename || this.filename();
        nda = this._ndarray(nda.data, nda.shape, nda.stride, nda.offset);

        fileStream = this._fs.createWriteStream(`${this._directory}/${filename}`);
        this._savePixels(nda, "png").pipe(fileStream);

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
