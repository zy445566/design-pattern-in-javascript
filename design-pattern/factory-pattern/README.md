# 工厂模式(Factory pattern)
工厂模式是比较常用的设计模式之一，那么什么叫工厂模式呢？简单来说，就是你需要什么东西不直接使用new的方法生成实例，然后统一通过工厂进行生产加工再生成实例。

# 工厂模式的实例
比如我们现在有很多形状比如圆形，矩形和正方形。这类都是属于形状，那我们是不是可以通过专门生产形状的工厂来生成它们的实例么？
```js
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
```
那么接下来，我们可以建立一个专门生产形状的工厂来生产它们了。即根据字符串来产生对应需要的类。你在这里可以看到类的出口都已经在一个方法中了。
```js
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
那么我们需要使用的时候，就可以直接只需要new出一个工厂，在根据字符串就能拿到对应的需要生产的类了。而不需要分别对类进行new。
```js
const shapeFactory = new ShapeFactory();
// 通过工厂拿各种形状
const shape1 = shapeFactory.getShape('CIRCLE');
shape1.draw();
const shape2 = shapeFactory.getShape('RECTANGLE');
shape2.draw();
const shape3 = shapeFactory.getShape('SQUARE');
shape3.draw();
/**
 * output:
 * I'm a circle
 * I'm a rectangle
 * I'm a square
 */
```
# 工厂模式的优势
那么使用工厂模式的好处也是显而易见的，比如实例的生产比较复杂，或者说生成实例后还需要额外加工，这个时候工厂给了我们一个统一的出入口，也方便了日后对这个实例的修改。比如你要修改工厂产出是一个单例的时候，就不需要在所有的类中修改，而只要在工厂出口修改即可达到目标。

[下一页(抽象工厂模式)](../abstract-factory-pattern/README.md)
