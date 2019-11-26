# 空对象模式（Null Object Pattern）
当存在两个同类的对象时，可以用相同的空对象来代替Null或undefined来做一些检测。
# 空对象模式的实例
定义基类
```js
class Customer {
   constructor(name) {
      this.name = name;    
   }
   getName() {}
   isNil() {}
}
```
定义一个真正使用的类和一个空对象类
```js
class RealCustomer extends Customer {
    getName() {
       return this.name;
    }
    isNil() {
       return false;
    }
}
class NullCustomer extends Customer {
    getName() {
       return "Not Available in Customer Database";
    }
    isNil() {
       return true;
    }
}
```
定义对象工厂方便生产
```js
class CustomerFactory {
    static getCustomer(name){
       for (let i = 0; i < CustomerFactory.names.length; i++) {
          if (CustomerFactory.names[i].toUpperCase()==name.toUpperCase()){
             return new RealCustomer(name);
          }
       }
       return new NullCustomer();
    }
}
```
在使用的时候空对象可以正常使用，而null却不能调用getName方法。
```js
CustomerFactory.names = ["Rob", "Joe", "Julie"];

const customer1 = CustomerFactory.getCustomer("Rob");
const customer2 = CustomerFactory.getCustomer("Bob");
const customer3 = CustomerFactory.getCustomer("Julie");
const customer4 = CustomerFactory.getCustomer("Laura");

console.log("Customers");
console.log(customer1.getName());
console.log(customer2.getName());
console.log(customer3.getName());
console.log(customer4.getName());
/**
 * output:
 * Customers
 * Rob
 * Not Available in Customer Database
 * Julie
 * Not Available in Customer Database
 */
```
# 空对象模式的优势
比如在使用某个类时，需要对这个类来做空判断，在不确定后续这个类的方法是否会被调用时，用一个相同类的空对象来返回，这样可以更加无缝对接空值判断。


[上一页(状态模式)](../state-pattern/README.md)

[下一页(策略模式)](../strategy-pattern/README.md)