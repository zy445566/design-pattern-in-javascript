# 组合实体模式（Composite Entity Pattern）
即将两个不同的实体组合成一个对象实体使用，每个组合的实体都是有对应的策略。

# 组合实体模式的实例
组合之前的实体
```js
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
```
粗颗粒度组合
```js
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
```
组合实体对象
```js
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
```
对外交互的客户端
```js
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
```
客户端使用组合实体
```js
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
```
# 组合实体模式的优势
对外只需要关心组合实体后暴露的功能，而不需要关心组合之前的实体。
