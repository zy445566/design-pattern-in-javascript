// 这是之前上文说的形状工厂
class Circle {
    draw() {
        console.log("I'm a circle")
    }
}
class Rectangle {
    draw() {
        console.log("I'm a rectangle")
    }
}
class Square {
    draw() {
        console.log("I'm a square")
    }
}
class ShapeFactory {
    getShape(shapeType){
        switch(shapeType) {
            case 'CIRCLE':
                return new Circle();
            case 'RECTANGLE':
                return new Rectangle();
            case 'SQUARE':
                return new Square();
            default:
                return null;
        }
    }
}
// 再新加一个颜色工厂
class Red {
    fill() {
        console.log("fill red")
    }
}
class Blue {
    fill() {
        console.log("fill blue")
    }
}
class Green {
    fill() {
        console.log("fill green")
    }
}

class ColorFactory {
    getColor(color){
        switch(color) {
            case 'RED':
                return new Red();
            case 'BLUE':
                return new Blue();
            case 'GREEN':
                return new Green();
            default:
                return null;
        }
    }
}
// 最后添加抽象工厂
class FactoryProducer {
    static getFactory(choice){
        switch(choice) {
            case 'SHAPE':
                return new ShapeFactory();
            case 'COLOR':
                return new ColorFactory();
            default:
                return null;
        }
    }
 }

// 运行代码

const shapeFactory = FactoryProducer.getFactory('SHAPE');
const shape1 = shapeFactory.getShape('CIRCLE');
shape1.draw();
const shape2 = shapeFactory.getShape('RECTANGLE');
shape2.draw();
const shape3 = shapeFactory.getShape('SQUARE');
shape3.draw();

const colorFactory = FactoryProducer.getFactory('COLOR');
const color1 = colorFactory.getColor('RED');
color1.fill();
const color2 = colorFactory.getColor('BLUE');
color2.fill();
const color3 = colorFactory.getColor('GREEN');
color3.fill();