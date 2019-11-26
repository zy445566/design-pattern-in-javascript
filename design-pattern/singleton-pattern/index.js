// 这是一种“懒汉式”写法，还有一种叫饿汉式写法，区别是懒汉使用时才初始化，饿汉则先初始化，用的时候直接给。
// 由于js不需要考虑线程安全，所以推荐使用懒汉式写法，饿汉在JS中反而容易产生没必要的垃圾。
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