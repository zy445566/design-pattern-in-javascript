
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

class Context {
    constructor(){
       this.state = null;
    }
    setState(state){
       this.state = state;     
    }
    getState(){
       return this.state;
    }
}

const context = new Context();
 
const startState = new StartState();
startState.doAction(context);

console.log(context.getState().toString());

const stopState = new StopState();
stopState.doAction(context);

console.log(context.getState().toString());