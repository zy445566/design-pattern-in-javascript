# 备忘录模式(Memento Pattern)
备忘录模式在游戏中很好理解，你在某个时间存了一份自己觉得完美的存档，但你要试试看看再让它更完美一点自己会不会挂掉，而不幸的是你挂了。那么你翻存档的时候发现还有一个存档，通过存档就像时间倒流一样回到了那个游戏节点。备忘录模式就是做这个用途的。

# 备忘录模式的实例
首先我们需要定义备忘录和它的状态。
```js
class Memento {
    constructor(state){
       this.state = state;
    }
    getState(){
       return this.state;
    }  
}
```
通过发起人来获取需要保存的备忘录或者是还原出需要还原的状态
```js
class Originator {
    setState(state){
       this.state = state;
    }
    getState(){
       return this.state;
    }
    saveStateToMemento(){
       return new Memento(this.state);
    }
    getStateFromMemento(memento){
       this.state = memento.getState();
    }
}
```
通过守护者来记录存档，或者是获取存档
```js
class CareTaker {
    constructor() {
        this.mementoList = [];
    }
    add(state){
        this.mementoList.push(state);
    }
    get(index){
       return this.mementoList[index];
    }
}
```
通过发起人和守护者来实现，备忘录的还原或保存。
```js
const originator = new Originator();
const careTaker = new CareTaker();
originator.setState("State #1");
originator.setState("State #2");
careTaker.add(originator.saveStateToMemento());
originator.setState("State #3");
careTaker.add(originator.saveStateToMemento());
originator.setState("State #4");

console.log("Current State: " + originator.getState());    
originator.getStateFromMemento(careTaker.get(0));
console.log("First saved State: " + originator.getState());
originator.getStateFromMemento(careTaker.get(1));
console.log("Second saved State: " + originator.getState());
/**
 * output:
 * Current State: State #4
 * First saved State: State #2
 * Second saved State: State #3
 */
```
# 备忘录模式的优势
可以说在编程中需要时光倒流的某些事件的一种最佳实践，通过备忘录模式来做类似的事情。

[上一页(中介者模式)](../mediator-pattern/README.md)

[下一页(观察者模式)](../observer-pattern/README.md)