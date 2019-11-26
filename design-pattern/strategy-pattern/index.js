class OperationAdd {
    doOperation(num1, num2) {
       return num1 + num2;
    }
}
class OperationSubstract {
    doOperation(num1, num2) {
       return num1 - num2;
    }
}
class OperationMultiply {
    doOperation(num1, num2) {
       return num1 * num2;
    }
}

class Context {
    constructor(strategy){
       this.strategy = strategy;
    }
    executeStrategy(num1, num2){
       return this.strategy.doOperation(num1, num2);
    }
}

let context = new Context(new OperationAdd());    
console.log("10 + 5 = " + context.executeStrategy(10, 5));

context = new Context(new OperationSubstract());      
console.log("10 - 5 = " + context.executeStrategy(10, 5));

context = new Context(new OperationMultiply());    
console.log("10 * 5 = " + context.executeStrategy(10, 5));
/**
 * output:
 * 10 + 5 = 15
 * 10 - 5 = 5
 * 10 * 5 = 50
 */