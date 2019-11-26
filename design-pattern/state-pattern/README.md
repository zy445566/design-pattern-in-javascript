# 状态模式（State Pattern）
即类的行为根据状态的改变而改变。
# 状态模式的实例
举例定义了两种状态，开始状态和结束状态
```js
class StartState {
    doAction(context) {
       console.log("Player is in start state");
       context.setState(this); 
    }
    toString(){
       return "Start State";
    }
}
class StopState {
    doAction(context) {
       console.log("Player is in stop state");
       context.setState(this); 
    }
    toString(){
       return "Stop State";
    }
}
```
定义根据状态，而发生改变的上下文类型。
```js
class Context {
    constructor(){
       this.state = null;
    }
    setState(state){
       this.state = state;     
    }
    getState(){
       return this.state.toString();
    }
}
```
那么在使用的时候，当Context的状态发生改变，那么Context获取状态的行为也发生了改变
```js
const context = new Context();
 
const startState = new StartState();
startState.doAction(context);

console.log(context.getState());

const stopState = new StopState();
stopState.doAction(context);

console.log(context.getState());
/**
 * output:
 * Player is in start state
 * Start State
 * Player is in stop state
 * Stop State
 */
```
# 状态模式的优势
适合一些需要根据状态而改变的类，或通过此来消除一些if...else语句。

[上一页(观察者模式)](../observer-pattern/README.md)

[下一页(空对象模式)](../null-object-pattern/README.md)