import Circle from './circle';
import Entity from './entity';

export default class {
    constructor() {}

    process(nda) {
        let height = nda.shape[1],
            width  = nda.shape[0],
            entities = [],
            idx;

        for (let y = 5; y < height - 70; y++) {
            for (let x = 5; x < width - 5; x++) {
                idx = (width * y + x) << 2;

                if (nda.data[idx] >= 100) {
                    let exists = entities.some((entity) => {
                        return entity.isInside(x, y);
                    });

                    if (!exists) {
                        let circle = new Circle(x, y, nda),
                            size = Math.PI * Math.pow(circle.radius, 2);

                        entities.push(new Entity(circle.center, circle.radius, size, circle.type));
                    }
                }
            }
        }
    }
}

