class Service1 {
    execute(){
       console.log("Executing Service1");
    }
  
    getName() {
       return "Service1";
    }
}
class Service2 {
    execute(){
       console.log("Executing Service2");
    }
  
    getName() {
       return "Service2";
    }
}

class InitialContext {
    lookup(jndiName){
        switch(jndiName.toUpperCase()) {
            case "SERVICE1":
                console.log("Looking up and creating a new Service1 object");
                return new Service1();
            case "SERVICE2":
                console.log("Looking up and creating a new Service2 object");
                return new Service2();
            default:
                return null;
        } 
    }
}

 class Cache {
    constructor(){
       this.services = [];
    }
    getService(serviceName){
       for (const service of this.services) {
          if(service.getName().toUpperCase()==serviceName.toUpperCase()){
             console.log("Returning cached  "+serviceName+" object");
             return service;
          }
       }
       return null;
    }
    addService(newService){
       let exists = false;
       for (const service of this.services) {
        if(service.getName().toUpperCase()==newService.getName().toUpperCase()){
             exists = true;
          }
       }
       if(!exists){
          this.services.push(newService);
       }
    }
}

class ServiceLocator {
    static getService(jndiName){
       const service = ServiceLocator.cache.getService(jndiName);
       if(service != null){
          return service;
       }
       const context = new InitialContext();
       const service1 = context.lookup(jndiName);
       ServiceLocator.cache.addService(service1);
       return service1;
    }
}
ServiceLocator.cache = new Cache();

let service = ServiceLocator.getService("Service1");
service.execute();
service = ServiceLocator.getService("Service2");
service.execute();
service = ServiceLocator.getService("Service1");
service.execute();
service = ServiceLocator.getService("Service2");
service.execute();      