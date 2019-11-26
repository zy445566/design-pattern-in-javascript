class DependentObject1 {
    setData(data){
       this.data = data; 
    } 
    getData(){
       return this.data;
    }
}

class DependentObject2 {
    setData(data) {
       this.data = data; 
    } 
    getData() {
       return this.data;
    }
}

class CoarseGrainedObject {
    constructor() {
        this.do1 = new DependentObject1();
        this.do2 = new DependentObject2();
    }
    
    setData(data1, data2){
        this.do1.setData(data1);
        this.do2.setData(data2);
    }
    getData(){
       return [this.do1.getData(),this.do2.getData()];
    }
}

class CompositeEntity {
    constructor() {
        this.cgo = new CoarseGrainedObject();
    }
    setData(data1, data2){
        this.cgo.setData(data1, data2);
    }
    getData(){
       return this.cgo.getData();
    }
}

class Client {
    constructor() {
        this.compositeEntity = new CompositeEntity();
    }
    printData(){
       for (let i = 0; i < this.compositeEntity.getData().length; i++) {
          console.log("Data: " + this.compositeEntity.getData()[i]);
       }
    }
    setData(data1, data2){
       this.compositeEntity.setData(data1, data2);
    }
}

const client = new Client();
client.setData("Test", "Data");
client.printData();
client.setData("Second Test", "Data1");
client.printData();
/**
 * output:
 * Data: Test
 * Data: Data
 * Data: Second Test
 * Data: Data1
 */