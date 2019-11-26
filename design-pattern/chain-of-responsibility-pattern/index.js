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

function getChainOfLoggers(){
    const errorLogger = new ErrorLogger(AbstractLogger.ERROR);
    const fileLogger = new FileLogger(AbstractLogger.DEBUG);
    const standardLogger = new StandardLogger(AbstractLogger.INFO);

    errorLogger.setNextLogger(fileLogger);
    fileLogger.setNextLogger(standardLogger);

    return errorLogger;  
}

const loggerChain = getChainOfLoggers();

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