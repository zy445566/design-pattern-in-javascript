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


const  circle = new Circle();
const redCircle = new RedShapeDecorator(new Circle());
const redRectangle = new RedShapeDecorator(new Rectangle());

console.log("Circle with normal border");
circle.draw();

console.log("\nCircle of red border");
redCircle.draw();

console.log("\nRectangle of red border");
redRectangle.draw();
/**
 * output:
 * Circle with normal border
 * Shape: Circle
 * 
 * Circle of red border
 * Shape: Circle
 * Border Color: Red
 * 
 * Rectangle of red border
 * Shape: Rectangle
 * Border Color: Red
 */
/**
 * 目前 @ 作为更加方便实现装饰器功能正在提案中
 * https://github.com/tc39/proposal-decorators
 */