export default class Shape {
    constructor(analyser, circleFactory, cellFactory, foodFactory, virusFactory, readonly = true) {
        this._analyser = analyser;
        this._Circle = circleFactory;
        this._Cell = cellFactory;
        this._Food = foodFactory;
        this._Virus = virusFactory;
        this._readonly = readonly;
    }

    isInside(x, y) {
        return this._circle.center.distance(x, y) <= this._circle.radius;
    }

    create(x, y, image) {
        this._analyser.set(image)
            .start(x, y);

        //let circle, [cx, cy, r] = getCircleProps(this._traceEdge.call({img: image, trace: [], traceEdge: traceEdge}, x, y));
        //circle = this.Circle(cx, cy, r);
    }
}



function getCircleProps(trace) {

}
