# 装饰器模式(Decorator Pattern)
装饰器模式实现了不改变原有对象，在原有对象上实现功能的添加。这是一种对原有对象的一种包装。
# 装饰器模式的实现
假设现在有两个形状，一个矩形一个圆形，这时候我们希望能在形状上实现一些特殊的功能，但又不改变原来的类，我们要如何做呢？
```js
class Rectangle {
    draw() {
       console.log("Shape: Rectangle");
    }
}

class Circle {
    draw() {
       console.log("Shape: Circle");
    }
}
```
这时我们可以用装饰器来实现，假设我们要给形状添加颜色功能
```js
class RedShapeDecorator {
    constructor(decoratedShape) {
       this.decoratedShape = decoratedShape;    
    }
    draw() {
       this.decoratedShape.draw();        
       this.setRedBorder();
    }
    setRedBorder(){
       console.log("Border Color: Red");
    }
}
```
那么在使用装饰器的类，在画圆的时候就实现了了画边框的颜色。
```js
const  circle = new Circle();
const redCircle = new RedShapeDecorator(new Circle());
const redRectangle = new RedShapeDecorator(new Rectangle());

console.log("Circle with normal border");
circle.draw();

console.log("\nCircle of red border");
redCircle.draw();

console.log("\nRectangle of red border");
redRectangle.draw();
```
# 装饰器模式的优势
即使原有对象发生改变，装饰器是种非侵入式功能添加，对原有对象的影响也能降低到最小。同时在JS中更方便的装饰器的实现也在提案中([https://github.com/tc39/proposal-decorators](https://github.com/tc39/proposal-decorators)),本文写于2019年11月。