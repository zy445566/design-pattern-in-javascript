class Rectangle {
    draw() {
       console.log("Rectangle::draw()");
    }
}

class Square {
    draw() {
       console.log("Square::draw()");
    }
}

class Circle {
    draw() {
       console.log("Circle::draw()");
    }
}

class ShapeMaker {
    constructor() {
        this.circle = new Circle();
        this.rectangle = new Rectangle();
        this.square = new Square();
    }

    drawCircle(){
        this.circle.draw();
    }
    drawRectangle(){
        this.rectangle.draw();
    }
    drawSquare(){
        this.square.draw();
    }
}

const shapeMaker = new ShapeMaker();

shapeMaker.drawCircle();
shapeMaker.drawRectangle();
shapeMaker.drawSquare();
/**
 * output:
 * Circle::draw()
 * Rectangle::draw()
 * Square::draw()
 */