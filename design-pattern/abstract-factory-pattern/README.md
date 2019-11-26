# 抽象工厂模式(abstract Factory Pattern)
上文讲到了工厂模式，这篇文章将抽象工厂，抽象工厂的名字是真的很抽象，也很容易让人抽象的理解，那么什么是抽象工厂呢？

其实抽象工厂，简单来说就是工厂的工厂，因为一般来说一个工厂只负责加载一类组件，那么你有很多小类组件需要生产，那么势必会有很多小类的工厂。那么你最终生产一个大类，那就要很多小类的工厂负责生产。那么如何更方便的管理或者说生产这些工厂呢？那就用生产工厂的工厂来生成吧。

# 抽象工厂模式的实例
先把上文说的形状工厂搬过来
```js
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
```
这时候你已经有形状了，但你觉得不美观，你还需要颜色，那么你这个时候，你又搞了个颜色工厂，如下：
```js
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
```
颜色工厂好了，但是你担心，以后工厂多了，不好管理咋办，那还是走之前的套路，把工厂通过抽象工厂生产出来。如下：
```js
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
```
那么这个时候和上文一样只需要new出一个抽象工厂，就能把所有需要的东西拿到手了:
```js
//通过抽象工厂拿形状工厂
const shapeFactory = FactoryProducer.getFactory('SHAPE');
// 通过工厂拿各种形状
const shape1 = shapeFactory.getShape('CIRCLE');
shape1.draw();
const shape2 = shapeFactory.getShape('RECTANGLE');
shape2.draw();
const shape3 = shapeFactory.getShape('SQUARE');
shape3.draw();

//通过抽象工厂拿颜色工厂
const colorFactory = FactoryProducer.getFactory('COLOR');
// 通过工厂拿各种颜色
const color1 = colorFactory.getColor('RED');
color1.fill();
const color2 = colorFactory.getColor('BLUE');
color2.fill();
const color3 = colorFactory.getColor('GREEN');
color3.fill();
/**
 * output：
 * I'm a circle
 * I'm a rectangle
 * I'm a square
 * fill red
 * fill blue
 * fill green
 */
```
# 抽象工厂模式的优势
那么使用抽象工厂模式的好处和工厂模式的好处很相似，给工厂做了一个统一的出入口，也方便了日后对这个工厂的修改。

[上一页(工厂模式)](../factory-pattern/README.md)

[下一页(单例模式)](../singleton-pattern/README.md)