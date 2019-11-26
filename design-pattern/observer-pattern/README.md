# 观察者模式(Observer Pattern)
当一个对象和另外几个对象产生关联的时候，当这个对象发生改变的时候实现通知对应对象变更。

# 观察者模式的实例
首先建立好观察者模式的模型，即构建队列再进行通知。
```js
class Subject {
    constructor() {
        this.observers = [];
    }
    getState() {
       return this.state;
    }
    setState(state) {
       this.state = state;
       this.notifyAllObservers();
    }
    attach(observer){
       this.observers.push(observer);      
    }
    notifyAllObservers(){
       for (const observer of this.observers) {
          observer.update();
       }
    }  
 }
```
假设我们需要实现一个功能输入一个十进制要显示出对应的其它进制，比如二进制和八进制和十六进制。当对象初始化后加入到观察者模型中。
```js
class BinaryObserver {
    constructor(subject){
        this.subject = subject;
        this.subject.attach(this);
    }
    update() {
        console.log( "Binary String: " 
        + this.subject.getState().toString(2) ); 
    }
}
class OctalObserver {
    constructor(subject){
        this.subject = subject;
        this.subject.attach(this);
    }
    update() {
        console.log( "Octal String: " 
        + this.subject.getState().toString(8) ); 
    }
}

class HexObserver {
    constructor(subject){
        this.subject = subject;
        this.subject.attach(this);
    }
    update() {
        console.log( "Hex String: " 
        + this.subject.getState().toString(16) ); 
    }
}
```
在使用的时候，只需要在观察者和对应的进制初始化完成即可使用。
```js
const subject = new Subject();
 
new HexObserver(subject);
new OctalObserver(subject);
new BinaryObserver(subject);

console.log("First state change: 15");   
subject.setState(15);
console.log("Second state change: 10");  
subject.setState(10);
/**
 * output:
 * First state change: 15
 * Hex String: f
 * Octal String: 17
 * Binary String: 1111
 * Second state change: 10
 * Hex String: a
 * Octal String: 12
 * Binary String: 1010
 */
```

# 观察者模式的优势
对于对象和对象的关系中，可以通过这种方式来降低耦合，同时在代码的使用上也更加直观。

[上一页(备忘录模式)](../memento-pattern/README.md)

[下一页(状态模式)](../state-pattern/README.md)