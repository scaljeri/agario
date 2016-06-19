export default function dummyData() {
    let length, i,
        data = {
        width: 9,
        height: 9,
        stride: 4,
        pixels: []
    };

    length = data.width * data.height * data.stride;

    for (i = 0; i < length; i++) {
        data.pixels.push(i);
    }

    return data;
}
