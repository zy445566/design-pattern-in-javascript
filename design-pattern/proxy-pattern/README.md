# 代理模式(Proxy Pattern)
用一个新的类来代理另一个类，这种模式一般用于方法的前置操作或拦截。
# 代理模式的实例
现有一个类在初始化的时候会装载磁盘，再调用display按钮展示文件。
```js
class RealImage {
    constructor(fileName){
        this.fileName = fileName;
        this.loadFromDisk(fileName);
    }
    display() {
        console.log("Displaying " + this.fileName);
    }
    loadFromDisk(fileName){
        console.log("Loading " + fileName);
    }
}
```
但我不想这样，我希望初始化不载入文件，而是在display的时候，如果发现没有载入就载入，如果载入了那就直接展示，那么我们要怎么做呢？

这个时候我们可以用一个类来代理这个类的行为。
```js
class ProxyImage {
    constructor(fileName){
       this.fileName = fileName;
    }
    display() {
       if(this.realImage == null){
          this.realImage = new RealImage(this.fileName);
       }
       this.realImage.display();
    }
}
```
那么我们在使用的时候就可以不改变原来的类，而实现一些不一样的功能
```js
const image = new ProxyImage("test_10mb.jpg");

console.log('not use es6 Proxy:')
// 图像将从磁盘加载
image.display();
console.log('')
// 图像不需要从磁盘加载
image.display();
/**
 * output:
 * not use es6 Proxy:
 * Loading test_10mb.jpg
 * Displaying test_10mb.jpg
 * 
 * Displaying test_10mb.jpg
 */
```
当然用最新的ES6也提供了代理的功能，就不细说了，有兴趣可以看以下
```js
const ProxyImageEs6 = new Proxy(RealImage,{
    construct: function(target, args) {
        let imageObj = {};
        imageObj.__proto__ = target.prototype;
        imageObj.fileName = args[0];
        return new Proxy(imageObj,{
            get: function (target, key, receiver) {
                if(key=='display') {
                    return ()=>{
                        if(this.realImage == null){
                            this.realImage = new RealImage(target.fileName);
                        }
                        this.realImage.display();
                    };
                }
                return Reflect.get(target, key, receiver);
            },
        });
    }
})
console.log('\n\nuse es6 Proxy:')
const imageEs6 = new ProxyImageEs6("test_10mb.jpg");
// 图像将从磁盘加载
imageEs6.display();
console.log('')
// 图像不需要从磁盘加载
imageEs6.display();
/**
 * output:
 * use es6 Proxy:
 * Loading test_10mb.jpg
 * Displaying test_10mb.jpg
 * 
 * Displaying test_10mb.jpg
 */
```

# 代理模式的优势
能在不改变原有类的情况下，实现一些功能或者实现拦截和一些前置操作。

[上一页(享元模式)](../flyweight-pattern/README.md)

[下一页(责任链模式)](../chain-of-responsibility-pattern/README.md)