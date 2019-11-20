class Shape {
    constructor() {
        this.id = null;
        this.type = null;
    }
    getType(){
       return this.type;
    }
    getId() {
       return this.id;
    }
    setId(id) {
       this.id = id;
    }
    clone() {
        /**
        * 如果子类要改成class形式，这个方法要改写成下面形式
        * 子类为function，主要是通过原型模式帮助理解JS原型链
        * return Reflect.construct(
        * this.__proto__.constructor, 
        * [], 
        * this.__proto__.constructor
        * )
        */
       let clone = {};
       clone.__proto__ = this.__proto__;
       this.__proto__.constructor.call(clone);
       return clone;
    }
 }

function Rectangle() {
    this.type = "Rectangle";
}
Rectangle.prototype.__proto__ = new Shape();
Rectangle.prototype.draw = function() {
    console.log("I'm a rectangle")
}

function Square() {
    this.type = "Square";
}
Square.prototype.__proto__ = new Shape();
Square.prototype.draw = function() {
    console.log("I'm a square")
}

function Circle() {
    this.type = "Circle";
}
Circle.prototype.__proto__ = new Shape();
Circle.prototype.draw = function() {
    console.log("I'm a circle")
}

class ShapeCache {
    static getShape(shapeId) {
       const cachedShape = ShapeCache.shapeMap.get(shapeId);
       return cachedShape.clone();
    }
    static loadCache() {
       const circle = new Circle();
       circle.setId("1");
       ShapeCache.shapeMap.set(circle.getId(),circle);

       const square = new Square();
       square.setId("2");
       ShapeCache.shapeMap.set(square.getId(),square);

       const rectangle = new Rectangle();
       rectangle.setId("3");
       ShapeCache.shapeMap.set(rectangle.getId(),rectangle);
    }
 }
 ShapeCache.shapeMap = new Map();


 ShapeCache.loadCache();

const clonedShape = ShapeCache.getShape("1");
console.log("Shape : " + clonedShape.getType());          

const clonedShape2 = ShapeCache.getShape("2");
console.log("Shape : " + clonedShape2.getType());         

const clonedShape3 = ShapeCache.getShape("3");
console.log("Shape : " + clonedShape3.getType());