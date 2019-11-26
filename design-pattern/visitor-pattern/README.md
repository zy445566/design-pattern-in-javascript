# 访问者模式（Visitor Pattern）
即根据访问者不同，所展示的行为也不同。

# 访问者模式的实例
首先我们定义一组设备
```js
class Keyboard {
    accept(computerPartVisitor) {
       computerPartVisitor.visit(this);
    }
}
class Monitor {
    accept(computerPartVisitor) {
       computerPartVisitor.visit(this);
    }
}
class Mouse {
    accept(computerPartVisitor) {
       computerPartVisitor.visit(this);
    }
}
```
定义电脑为一种设备，同时集成了其它设备
```js
class Computer {
    constructor(){
       this.parts = [new Mouse(), new Keyboard(), new Monitor()];      
    } 
    accept(computerPartVisitor) {
       for (let i = 0; i < this.parts.length; i++) {
        this.parts[i].accept(computerPartVisitor);
       }
       computerPartVisitor.visit(this);
    }
}
```
定义访问者接口
```js

class ComputerPartDisplayVisitor{
    visit(device) {
        console.log(`Displaying ${device.constructor.name}.`);
    }
}
```
在使用的时候都只需要用设备接受新的访问者即可实现对应访问者的功能
```js
const computer = new Computer();
computer.accept(new ComputerPartDisplayVisitor());
/**
 * output:
 * Displaying Mouse.
 * Displaying Keyboard.
 * Displaying Monitor.
 * Displaying Computer.
 */
```
# 访问者模式的优势
如上类似设备这个东西是一个相对稳定的结构，而访问者要实现的功能又是非常不确定的，那么针对不同访问者，都可以对相同的设备进行不同的输出。其次只需要暴露特定接口，而相对稳定的设备不需要考虑接口中实现的内容。

[上一页(模板模式)](../template-pattern/README.md)