# 原型模式(Prototype Pattern)
大家熟知的原型链，也是按照原型模式进行。原型模式是一种创建对象的方式。今天我们就以JS的原型链作为主要讲解，通过原型链的实例继承和对象的创建。本文可能需要对JS原型链一定的了解，否则阅读本文可能会相对困难。

# 原型模式的实例
首先我们需要实现一个类，这个类可以通过clone的方法实现原型的创建对象，那么这个clone实际是就是实现了JS中的new的功能，因为JS对象的创建本来就是通过原型的方式实现而不是完全重现开辟空间。所以我们讲原型模式可以直接模拟JS类创建的方式即可。
```js
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
```
对于子类，原型链要实现继承是需要通过不断的追溯__proto__之上的对象作为继承的类，而prototype实例化之后会赋引用值到__proto__，所以要实现继承则是绑定prototype.__proto__作为追溯所得的结果之一。
```js
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
```
在当前例子中，我们通过载入形状的cache的方式，再从cache中调用clone方法来实现原型创建的例子。
```js
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
```
# 原型模式的优势
在其它编程中使用原型模式的优势是使用更小的代价来创建对象，通过原型引用的方式而不是开辟新的空间。但JS是个例外，直接new就好了，因为JS创建对象的方式就是原型引用，所以对比其它语言创建大对象的性能，能高出不少。

[上一页(建造者模式)](../builder-pattern/README.md)

[下一页(适配器模式)](../adapter-pattern/README.md)