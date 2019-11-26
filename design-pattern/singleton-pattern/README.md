# 单例模式(Singleton Pattern)
什么叫单例模式，简单来说就是一个实例只生产一次。

# 单例模式的实例
这个很简单，我觉得可以直接看代码。

这是一种“懒汉式”写法，还有一种叫饿汉式写法，区别是懒汉使用时才初始化，饿汉则先初始化，用的时候直接给。

由于js不需要考虑线程安全，所以推荐使用懒汉式写法，饿汉在JS中反而容易产生没必要的垃圾。
```js
class SingleObject {
    constructor() {
        // 防止调用new初始化
        if(new.target != undefined) {
            const errorMsg = "This is single object,Can't use keyword new!";
            const tipMsg = "You should use method getInstance to get instance。";
            throw new Error(`\n${errorMsg}\n${tipMsg}`)
        }
    }
    static getInstance(){
        // 生产单例
        if(SingleObject.instance) {
            return SingleObject.instance;
        }
        SingleObject.instance = {};
        SingleObject.instance.__proto__ = SingleObject.prototype;
        return SingleObject.instance;
    }
 
    showMessage(){
       console.log("Hello World!");
    }
}
const instance = SingleObject.getInstance();
instance.showMessage();
/**
 * output:
 * Hello World!
 */
```
# 单例模式的优势
对于频繁使用且可重复使用的对象，可以极大来减少内存消耗和没必要的垃圾回收。

[上一页(抽象工厂模式)](../abstract-factory-pattern/README.md)

[下一页(建造者模式)](../builder-pattern/README.md)