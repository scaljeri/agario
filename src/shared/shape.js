export default class Shape {
    constructor(traceEdge, circleFactory, cellFactory, foodFactory, virusFactory, readonly = true) {
        this._traceEdge = traceEdge;
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
        let circle, [cx, cy, r] = getCircleProps(traceEdge.call({img: image, trace: [], traceEdge: traceEdge}, x, y));
        circle = this.Circle(cx, cy, r);
    }
}



function getCircleProps(trace) {

}
