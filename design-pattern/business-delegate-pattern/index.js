class EJBService {
    doProcessing() {
       console.log("Processing task by invoking EJB Service");
    }
}
class JMSService {
    doProcessing() {
       console.log("Processing task by invoking JMS Service");
    }
}

class BusinessLookUp {
    getBusinessService(serviceType){
        switch(serviceType.toUpperCase()) {
            case 'EJB':
                return new EJBService();
            default:
                return new JMSService();
        }
    }
}

class BusinessDelegate {
    constructor() {
        this.lookupService = new BusinessLookUp();
    }
    setServiceType(serviceType){
       this.serviceType = serviceType;
    }
    doTask(){
       this.businessService = this.lookupService.getBusinessService(this.serviceType);
       this.businessService.doProcessing();     
    }
}

class Client {
    constructor(businessService){
       this.businessService  = businessService;
    }
  
    doTask(){      
        this.businessService.doTask();
    }
 }

const businessDelegate = new BusinessDelegate();
businessDelegate.setServiceType("EJB");

const client = new Client(businessDelegate);
client.doTask();

businessDelegate.setServiceType("JMS");
client.doTask();