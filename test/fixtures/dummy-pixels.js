let data = {
    width: 9,
    height: 9,
    stride: 4,
    pixels: []
};

let length = data.width * data.height * data.stride;

for(let i = 0; i < length; i++) {
   data.pixels.push(i);
}

export default data;
