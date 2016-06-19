import Victor from 'victor';

const center = new Victor(40, 40),
    radius = 20;

export const imageData = function () {
    let width = 100, height = 100,
        pixels = [],
        pixel = new Victor(0, 0);

    for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
            pixel.x = w;
            pixel.y = h;

            if (center.distance(pixel) <= radius) {
                pixels.push(200);
            } else {
                pixels.push(0);
            }
        }
    }

    return {
        pixels,
        indexOf: (x, y) => {
            return y * width + x;
        },
        top: {x: center.x, y: center.y - radius},
        bottom: {x: center.x, y: center.y + radius},
        left: {x: center.x - radius, y: center.y},
        right: {x: center.x + radius, y: center.y}
    }
};
