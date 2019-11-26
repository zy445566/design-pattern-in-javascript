# 责任链模式(Chain of Responsibility Pattern)
这是一种链式结构的一种设计模式，比如如果当前类有义务要做某项事情的时候就必须要去完成

# 责任链模式的实例
假设我们的日志系统有三个报错级别，分别是ERROR，DEBUG，INFO。现在我们在做日志系统的时候有一个需求，就是当出现ERROR时要同时打印到ERROR，DEBUG，INFO的控制台上，而出现DEBUG要同时打印到DEBUG，INFO的控制台上，INFO只需要打印到INFO的控制台上。

那么我们可以用一种链式设计来完成这种事情,首先我们抽象化日志的类型。
```js
class AbstractLogger {
    constructor() {
        if(new.target == AbstractLogger) {
            throw new Error('this class must be extends.')
        }
    }
    setNextLogger(nextLogger){
       this.nextLogger = nextLogger;
    }
    write(message) {}
    // 对于形成链的数据，依次执行
    logMessage(level, message){
       if(this.level <= level){
          this.write(message);
       }
       if(this.nextLogger !=null){
          this.nextLogger.logMessage(level, message);
       }
    }
}
AbstractLogger.INFO = 1;
AbstractLogger.DEBUG = 2;
AbstractLogger.ERROR = 3;
```
然后我们实现不同错误级别日志的实体类
```js
//定义错误类型
class StandardLogger extends AbstractLogger {
    constructor(level){
        super()
        this.level = level;
    }
    write(message) {    
       console.log("Standard Console::Logger: " + message);
    }
}
class ErrorLogger extends AbstractLogger {
    constructor(level){
        super()
        this.level = level;
    }
    write(message) {    
       console.log("Error Console::Logger: " + message);
    }
}
class FileLogger extends AbstractLogger {
    constructor(level){
        super()
        this.level = level;
    }
    write(message) {    
       console.log("File Console::Logger: " + message);
    }
}
```
然后我们再把它链式化
```js
function getChainOfLoggers(){
    const errorLogger = new ErrorLogger(AbstractLogger.ERROR);
    const fileLogger = new FileLogger(AbstractLogger.DEBUG);
    const standardLogger = new StandardLogger(AbstractLogger.INFO);

    errorLogger.setNextLogger(fileLogger);
    fileLogger.setNextLogger(standardLogger);

    return errorLogger;  
}
```
那么我们在使用的时候就只需要使用链式化的对象即可
```js
// 实现级别高的报错依次从当前级别输出到低级别
loggerChain.logMessage(AbstractLogger.INFO, "This is an information.");
console.log('')
loggerChain.logMessage(AbstractLogger.DEBUG,
    "This is a debug level information.");
console.log('')
loggerChain.logMessage(AbstractLogger.ERROR,
    "This is an error information.");
/**
 * output:
 * Standard Console::Logger: This is an information.
 * 
 * File Console::Logger: This is a debug level information.
 * Standard Console::Logger: This is a debug level information.
 * 
 * Error Console::Logger: This is an error information.
 * File Console::Logger: This is an error information.
 * Standard Console::Logger: This is an error information.
 */
```

# 责任链模式的优势
当前责任人只需要关心自己应该尽什么责任，而不是要关心，自己完成责任后而发什么的其它的什么责任。避免了发送者和多个接受者耦合在一起。


[上一页(代理模式)](../proxy-pattern/README.md)

[下一页(命令模式)](../command-pattern/README.md)