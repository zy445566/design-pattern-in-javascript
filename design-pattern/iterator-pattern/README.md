# 迭代器模式(Iterator Pattern)
主要是用于遍历数据，比如迭代链表。在数据过大时亦可像流一样，一点一点来接数据。

# 迭代器模式的实例
定义生成器，在生成器中定义迭代器，并通过迭代器返回
```js
class NameRepository {
    constructor() {
        this.names = ["Robert" , "John" ,"Julie" , "Lora"];
    }
    getIterator() {
        const names = this.names;
        class NameIterator{
            constructor() {
                this.index = 0;
            }
            hasNext() {
                if(this.index < names.length){
                    return true;
                }
                return false;
            }
            next() {
                if(this.hasNext()){
                    return names[this.index++];
                }
                return null;
            }     
        }
       return new NameIterator();
    }
}
```
通过生成器和迭代器的方式，即可在for循环中直接遍历数据，如下
```js
console.log("ES5 Iterator:");
const namesRepository = new NameRepository();
for(const iter = namesRepository.getIterator(); iter.hasNext();){
    const name = iter.next();
    console.log("Name : " + name);
}
/**
 * output:
 * ES5 Iterator:
 * Name : Robert
 * Name : John
 * Name : Julie
 * Name : Lora
 */
```
当然还有ES6的写法,其实很类似，就不详细说了。
```js
// 而在es6中可以这样使用
class NameRepositoryEs6 {
    constructor() {
        this.names = ["Robert" , "John" ,"Julie" , "Lora"];
        this.index = 0;
    }
    [Symbol.iterator]() {
        return {
            next:  () => {
                let done = true;
                if(this.index < this.names.length){
                    done = false;
                }
                return {value: this.names[this.index++],done};
            }
          };
    }
}
console.log("\nES6 Iterator:");
const namesRepositoryEs6 = new NameRepositoryEs6()
for(const name of namesRepositoryEs6) {
    console.log("Name : " + name);
}
/**
 * output:
 * ES6 Iterator:
 * Name : Robert
 * Name : John
 * Name : Julie
 * Name : Lora
 */
```
# 迭代器模式的优势
通过迭代器的方式可以更方便的遍历有规律的数据，或者是通过迭代器来完成一些流式操作。

[上一页(解释器模式)](../interpreter-pattern/README.md)

[下一页(中介者模式)](../mediator-pattern/README.md)