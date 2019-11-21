class AuthenticationFilter {
    execute(request){
       console.log("Authenticating request: " + request);
    }
}

class DebugFilter {
    execute(request){
       console.log("request log: " + request);
    }
}

class Target {
    execute(request){
        console.log("Executing request: " + request);
    }
}

class FilterChain {
    constructor() {
        this.filters = [];
    }
  
    addFilter(filter){
       this.filters.push(filter);
    }
  
    execute(request){
       for (let filter of this.filters) {
          filter.execute(request);
       }
       this.target.execute(request);
    }
  
    setTarget(target){
       this.target = target;
    }
}

class FilterManager {
    constructor(target){
       this.filterChain = new FilterChain();
       this.filterChain.setTarget(target);
    }
    setFilter(filter){
        this.filterChain.addFilter(filter);
    }
  
    filterRequest(request){
        this.filterChain.execute(request);
    }
}

class Client {
    setFilterManager(filterManager){
       this.filterManager = filterManager;
    }
  
    sendRequest(request){
        this.filterManager.filterRequest(request);
    }
 }

 const filterManager = new FilterManager(new Target());
 filterManager.setFilter(new AuthenticationFilter());
 filterManager.setFilter(new DebugFilter());

 const client = new Client();
 client.setFilterManager(filterManager);
 client.sendRequest("HOME");