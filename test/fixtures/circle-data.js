export default function create(cx = 12, cy = 13, r = 4) {
    let angle = 0,
        data = [],
        step = Math.PI / 100,
        x, y;

    for (var i = 0; i < 100; i++) {
        x = cx + r * Math.cos(angle);
        y = cy + r * Math.sin(angle);

        data.push({x, y});

        angle += step;
    }

    return data;
}
