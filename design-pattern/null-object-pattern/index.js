class Customer {
   constructor(name) {
      this.name = name;    
   }
   getName() {}
   isNil() {}
}

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