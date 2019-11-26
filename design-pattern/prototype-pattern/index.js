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
        * 因为主要是通过JS原型链帮助理解原型模式，所以子类不使用class形式
        * class和function构造函数的区别是class的构造函数增加了只能作为构造函数使用的校验，比如new
        * return Reflect.construct(
        * this.__proto__.constructor, 
        * [], 
        * this.__proto__.constructor
        * )
        */
       let clone = {};
       // 注意如果此类被继承，this会变成子类的方法
       // 同时这里使用的是原型的指针，所以比直接创建对象性能损耗更低
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
/**
 * output:
 * Shape : Circle
 * Shape : Square
 * Shape : Rectangle
 */